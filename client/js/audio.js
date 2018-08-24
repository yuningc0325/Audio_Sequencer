/**
* @author: Yu-Ning, Chang
* Process audio such as playing, recording and sound adjustment through HTML5 Web Audio API
* (For sequencer)
* 	  
* @global variables
* ==================
* notesSoundArr(Array), notesArray(Array), tempo(number)
*		  
* @global functions
* ==================		  
* pointerAnimation stopAnimation clearAllTimeOut loadingControl
* 
* Code reference:
* 1.Boris Smus(2013) Web Audio API .O'Reilly Media 
* 2.https://developer.mozilla.org/en/docs/Web/API/Web_Audio_API
* 
*/

 /* global $ tempo notesArray  notesSoundArr MediaRecorder pointerAnimation stopAnimation
	clearAllTimeOut loadingControl
 */
	 
 	// Notes from mongoDB
 var bufferList= new Array(21),
 	// Time interval (second) of each beat. 
 	// bpm table :https://goo.gl/xqwV6z
 	BeatOffset =60/tempo,
 	// Audio context
 	context,
 	// Array with audio sources which is used to be stopped.
 	removeArray=[],
 	// Store notes that user selects.
 	selectedBufferList =new Array(16),
 	// Store the index number of selectedBufferList array
 	indexOfSbf =new Array(16),
 	mediaRecorder,
 	dest,
 	gainNode;

 // Assign selectedBufferList and indexOfSbf
 for(var i=0;i<16;i++){
 	selectedBufferList[i]=[];
 	indexOfSbf[i]=[];
 }
 
 
/**
 * @description This function can check if HTML5 web audio API is compatible with users' browser or not.
 */
function checkUsable(){
 	var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
	if(contextClass){
		context=new contextClass();
		// Create a media stream destination node
		dest=context.createMediaStreamDestination();
		mediaRecorder = new MediaRecorder(dest.stream);
		// Create a master gain node
		gainNode=context.createGain();
		// gainNode.gain.value=0;
		console.log("Web Audio API can work in this browser")
	}else{
		console.log("something went wrong");
	}
 }


/**
 *  @description Get the audio from external audio file (through url stored in MongoDB)
 *	@params instrument. number from 0-3
 *  0: Piano, 1:Strings, 2:Woodwind, 3:Synth
 */
function soundBuffer(instrument){
	notesSoundArr[instrument].forEach(function(el,i){ 
	    var request= new XMLHttpRequest();
		request.open('GET', el, true);
		request.responseType = 'arraybuffer';
		request.onload = function() { 
			context.decodeAudioData(request.response, function(theBuffer) { 
		       // Reverse the order of buffer data so that the highest note can be put on the top of sequencer
		       bufferList[20-i]=theBuffer;
			   }, function(err){console.log(err)}); 
		}
		request.send();
	});
}

/**
 * @description This function can play a note with a given audio buffer
 * @params buffer. audiobuffer  
 */
function playSound(buffer) {
	// Create a source 
	var source = context.createBufferSource(); 
	source.buffer = buffer; 
	// Connect source to the gain node.
	source.connect(gainNode);
	// Connect gainNode to the destination
	gainNode.connect(context.destination);
	// Start playing
	source.start(0);
}

/**
 * @description Reassign the selectedBufferList when users change their instrument
 */	
function reassignSelectedBuffer(){
	for(let i=0;i<16;i++){
		for(let j=0;j<selectedBufferList[i].length;j++){
			(selectedBufferList[i])[j]=bufferList[(indexOfSbf[i])[j]];
		}
	}
}
							
							
/**
 * @description Remove all notes from selectedBufferList when clicking clear button.
 */
function removeAllNotes(){
	for(var i=0;i<16;i++){
		selectedBufferList[i]=[];
	}
	$('.columes').contents().removeClass('notesContextClick');
}


/**
 * @description When the note on sequencer is clicked, push the clicked note to selectedBufferList, vice versa.
 */
function triggerSound(){
	for(var i=1;i<=16;i++){
	    for(var j=3;j>0;j--){
	    	
	        notesArray.forEach(function(el,k){
	            var indexOfJ=j;
	            var indexOfI=i-1;
	            
	            // Create the click event of buttons on the sequencer
	            $('#'+i+'_'+j+'_'+el.notes).on('click',function(){
	            	  var sound= bufferList[k+21-7*indexOfJ];
	            	  var indexOfSound =k+21-7*indexOfJ;
	                  // If the note is not selected then adding this note to the array, 
	                  // otherwise, it will be removed.
	                  if($(this).attr('class')=="notesContext notesContextClick"){
	                  	 selectedBufferList[indexOfI].pop(sound);
	                  	 indexOfSbf[indexOfI].pop(indexOfSound);
	                  }else{
	                  	selectedBufferList[indexOfI].push(sound);
	                  	indexOfSbf[indexOfI].push(indexOfSound);
	                    playSound(sound);
	                  }
	                  $(this).toggleClass('notesContextClick');
	            })
	        })
	    }
	}
}

/**
 * @description Control click event of play button.
 */
function playToggle(){
	
	$('.button-main-playback').on('click',function(){
		// Play notes on sequence 
		for(let i=0;i<16;i++){
			startPlaying(selectedBufferList[i],i,BeatOffset*i);
		}
		
		// Make sequencer unclickable when playing
		$('#sequencer').toggleClass('clickNotAllowed');
		//Start pointer animation
		pointerAnimation();
	
		//Make buttons on console disable when playing the sound
        $('.button-on-edition-console').toggleClass('clickNotAllowed');
		// Turn play button into stop button
		$(this).children().removeClass('fa-play');
		$(this).removeClass('button-main-playback');
		$(this).children().addClass('fa-stop');
		$(this).addClass('button-main-stop');
		$(this).unbind('click');
		
		$('.button-main-stop').on('click',function(){
			// Stop pointer animation
			stopAnimation();
			clearAllTimeOut();
			
			// Recover volumeInterval
			volumeInterval();
			
    		// Stop playing the song 
			stopPlaying();
			
			// Recover the sequencer 
			$('#sequencer').toggleClass('clickNotAllowed');
			
			// Recover the console
            $('.button-on-edition-console').toggleClass('clickNotAllowed');
			
			//Turn 'stop' button into 'play' button
			$(this).children().removeClass('fa-stop');
			$(this).removeClass('button-main-stop');
			$(this).children().addClass('fa-play');
			$(this).addClass('button-main-playback');
			$(this).unbind('click');
			
			// Recursive the function
			playToggle();
		})
	})
}

/**
 * @description Play notes (chord) with a given array
 * @params bufferArr, selectedBufferList
 * @params indexOfArr, index number
 * @params setOffTime, number (second) 
 */

function startPlaying(bufferArr,indexOfArr,setOffTime) {
	for(var i=0;i<16;i++){
		 this['source_'+i+'_'+indexOfArr]=context.createBufferSource();
		 this['source_'+i+'_'+indexOfArr].buffer=bufferArr[i];
		 this['source_'+i+'_'+indexOfArr].connect(gainNode);
		 gainNode.connect(context.destination);
		 this['source_'+i+'_'+indexOfArr].start(context.currentTime+setOffTime);

		 // Stores all sources in this array for making these sources can be accessible.
		 removeArray.push(this['source_'+i+'_'+indexOfArr]);
	}
}

/**
 * @description Record notes with a given array
 * @params bufferArr, selectedBufferList
 * @params indexOfArr, index number
 * @params setOffTime, number (second) 
 */
function startRecording(bufferArr,indexOfArr,setOffTime) {
	let numOfSource=bufferArr.length;
	for(var i=0;i<numOfSource;i++){
		 this['source_'+i+'_'+indexOfArr]=context.createBufferSource();
		 this['source_'+i+'_'+indexOfArr].buffer=bufferArr[i];
		 this['source_'+i+'_'+indexOfArr].connect(gainNode);
		 gainNode.connect(dest);
		 this['source_'+i+'_'+indexOfArr].start(context.currentTime+setOffTime);
		 removeArray.push(this['source_'+i+'_'+indexOfArr]);
	}
}

/**
 * @description Stop playing all notes
 */
function stopPlaying(){
	removeArray.forEach(function(el){
		el.stop(0);
	})
	//Reassign the array
	removeArray=[];
}

/**
 * @description This function can adjust the sound volume.
 * @param volume. Number from 0-100
 */
function volumeAdjustment(volume){
	gainNode.gain.value=volume*0.005;
	
} 

/**
 * @description Capture value from the volume knob every 0.3sec.
 */
function volumeInterval(){
	setInterval(function(){
	   var volume=$('#volume').parent().text();
	   volumeAdjustment(volume);
	   console.log(volume);
	},300)
}

	
checkUsable();
soundBuffer(0);
triggerSound();
playToggle();
volumeInterval();


/**Make the sequencer available. Using setTimeout can make sure the sequencer is ready for user. */
setTimeout(function(){loadingControl();},0);