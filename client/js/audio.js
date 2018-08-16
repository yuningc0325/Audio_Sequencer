/**
 * @global notesSoundArr contains 4 instrument arrays
 * notesSoundArr[0]: piano, notesSoundArr[1]: strings, notesSoundArr[2]: windwood, notesSoundArr[3]: synth
 * @global notesArray contains 21 notes from c2 to b4
 * @global Number: currentInstrument is the instrument user has chosen 
 * 0: piano,1: strings, 2 windwood, 3 synth
 * @global tempo: b.p.m (beats per minute) of the song
 * When using Web Audio API, there are three steps
 * 1. Make sure the browser can run the API, if it works then the context will be created.
 * 2. Produce sound buffer from outside audio source(mp3, wav,...) then convert it into sound buffer
 * 3. Make a function for playing sound with created buffer. 
 *      3.1 create source buffer
 *      3.2 create filters, gains,... (optional)
 *      3.3 create destination object
 *      3.4 connect all together in order.
 * Code Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 * 
 */
 
 /*external variables and functions*/
 /* global $ tempo notesArray source1 notesSoundArr MediaRecorder pointerAnimation stopAnimation
	clearAllTimeOut loadingControl
 */
	 
 	// notes from mongoDB
 var bufferList= new Array(21),
 	// interval (second) of each beats. bpm table :https://goo.gl/xqwV6z
 	BeatOffset =60/tempo,
 	// Audio context
 	context,
 	// Array with audio sources which are about to be stopped.
 	removeArray=[],
 	// store selected notes in an array
 	selectedBufferList =new Array(16),
 	// store the index of selectedBufferList array
 	indexOfSbf =new Array(16),
 	//record buffer
 	//https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder
 	mediaRecorder,
 	// new desitination that can store recorded sound 
 	dest,
 	gainNode;

 for(var i=0;i<16;i++){
 	selectedBufferList[i]=[];
 	indexOfSbf[i]=[];
 }
 
 
/**Make sure Web Audio API can be used in different browsers*/
function checkUsable(){
 	var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
	if(contextClass){
		context=new contextClass();
		// create media stream destination
		dest=context.createMediaStreamDestination();
		mediaRecorder = new MediaRecorder(dest.stream);
		gainNode=context.createGain();
		gainNode.gain.value=0.5;
		console.log("Web Audio API can work in this browser")
	}else{
		console.log("something went wrong");
	}
 }

/**
 *	Get the audio from external audio file (through url stored in MongoDB)
 *	@params instrument. number from 0-3
 */
function soundBuffer(instrument){
	notesSoundArr[instrument].forEach(function(el,i){ 
	    var request= new XMLHttpRequest();
		request.open('GET', el, true);
		request.responseType = 'arraybuffer';
		request.onload = function() { 
			context.decodeAudioData(request.response, function(theBuffer) { 
		       // reverse the order of buffer data so that the highest note can be put on the top of edtion board
		       bufferList[20-i]=theBuffer;
			   }, function(err){console.log(err)}); 
		}
		request.send();
	});
}

/**
 * This function can play a note with a given audio buffer
 * @params buffer. audiobuffer  
 */
function playSound(buffer) {
	// create a source 
	var source = context.createBufferSource(); 
	source.buffer = buffer; 
	// connect source to the gainNode
	source.connect(gainNode);
	// connect gainNode to destination
	gainNode.connect(context.destination);
	// play the source 
	source.start(0);
}
	
/**Reassign the selectedBufferList when user change their instrument*/
function reassignSelectedBuffer(){
	for(let i=0;i<16;i++){
		for(let j=0;j<selectedBufferList[i].length;j++){
			(selectedBufferList[i])[j]=bufferList[(indexOfSbf[i])[j]];
		}
	}
}
							
/**Remove all notes from selectedBufferList when click 'clear' button*/
function removeAllNotes(){
	for(var i=0;i<16;i++){
		selectedBufferList[i]=[];
	}
	$('.columes').contents().removeClass('notesContextClick');
}

/**When note division on sequencer is clicked, stores the clicked note in selectedBufferList, vice versa.*/
function triggerSound(){
	for(var i=1;i<=16;i++){
	    for(var j=3;j>0;j--){
	        notesArray.forEach(function(el,k){
	            var indexOfJ=j;
	            var indexOfI=i-1;
	            $('#'+i+'_'+j+'_'+el.notes).on('click',function(){
	            	  var sound= bufferList[k+21-7*indexOfJ];
	            	  var indexOfSound =k+21-7*indexOfJ;
	                  // Store notes in an array
	                  // If division is not selected then adding the note to array, otherwise remove it.
	                  if($(this).attr('class')=="notesContext notesContextClick"){
	                  	 selectedBufferList[indexOfI].pop(sound);
	                  	 indexOfSbf[indexOfI].pop(indexOfSound);
	                  	 //console.log(sound+" on to off");
	                  }else{
	                  	selectedBufferList[indexOfI].push(sound);
	                  	indexOfSbf[indexOfI].push(indexOfSound);
	                    playSound(sound);
	                    // console.log(sound);
	                    // console.log(sound+" off to on");
	                  }
	                  $(this).toggleClass('notesContextClick');
	            })
	        })
	    }
	}
}

/**Switch and control the status of sequencer*/
function playToggle(){
	
	$('.button-main-playback').on('click',function(){
		let lengthOfSelectedBuffer=selectedBufferList.length;
		// Play notes in sequence 
		for(let i=0;i<lengthOfSelectedBuffer;i++){
			startPlaying(selectedBufferList[i],i,BeatOffset*i);
		}
		//Start pointer animation
		pointerAnimation();
	
		//Make buttons on console disable when playing the sound
        $('.button-on-edition-console').prop('disabled',true);
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
			
			// prevent stopping volume interval
			volumeInterval();
			
    		// Stop playing the song 
			stopPlaying();
			//recover the console
            $('.button-on-edition-console').prop('disabled',false);
			
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
 * Play notes (chord) with a given array
 * @params bufferArr, selectedBufferList
 * @params indexOfArr, index number
 * @params setOffTime, number (second) 
 */

function startPlaying(bufferArr,indexOfArr,setOffTime) {
	// If the program is in 'stop' status, play the sound. Otherwise, stop the sound immediately.
	let numOfSource=bufferArr.length;
	for(var i=0;i<numOfSource;i++){
		 this['source_'+i+'_'+indexOfArr]=context.createBufferSource();
		 this['source_'+i+'_'+indexOfArr].buffer=bufferArr[i];
		 this['source_'+i+'_'+indexOfArr].connect(gainNode);
		 gainNode.connect(context.destination);
		 //this['source_'+i+'_'+indexOfArr].connect(context.destination);
		 this['source_'+i+'_'+indexOfArr].start(context.currentTime+setOffTime);

		 // Stores all sources in this array for making these sources can be accessible.
		 removeArray.push(this['source_'+i+'_'+indexOfArr]);
	}
}

/**
 * Record notes with a given array
 * @params bufferArr, selectedBufferList
 * @params indexOfArr, index number
 * @params setOffTime, number (second) 
 */
function startRecording(bufferArr,indexOfArr,setOffTime) {
	// If the program is in 'stop' status, play the sound. Otherwise, stop the sound immediately.
	let numOfSource=bufferArr.length;
	for(var i=0;i<numOfSource;i++){
		 this['source_'+i+'_'+indexOfArr]=context.createBufferSource();
		 this['source_'+i+'_'+indexOfArr].buffer=bufferArr[i];
		 this['source_'+i+'_'+indexOfArr].connect(gainNode);
		 gainNode.connect(dest);
		 this['source_'+i+'_'+indexOfArr].start(context.currentTime+setOffTime);
		 // Stores all sources in this array for making these sources can be accessible.
		 removeArray.push(this['source_'+i+'_'+indexOfArr]);
	}
}

/** Stop playing all notes */
function stopPlaying(){
	removeArray.forEach(function(el){
		el.stop(0);
	})
	//Reassign the array
	removeArray=[];
}

/**
 * Adjust volume
 * @params volume. number from 0 to 100
 *
 */
function volumeAdjustment(volume){
	gainNode.gain.value=volume*0.01;
	
} 

function volumeInterval(){
	setInterval(function(){
	   var volume=$('#volume').parent().text();
	   volumeAdjustment(volume);
	   console.log(volume);
	},300)
}


	
// start using Web Audio API to process notes and console
checkUsable();
soundBuffer(0);
triggerSound();
playToggle();
volumeInterval();



/**Make the sequencer available. Using setTimeout can make sure the sequencer is ready for user. */
setTimeout(function(){loadingControl();},0);




	