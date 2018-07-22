/**
 * @params Array: notesSoundArr contains 4 instrument arrays
 * notesSoundArr[0]: piano, notesSoundArr[1]: strings, notesSoundArr[2]: windwood, notesSoundArr[3]: synth
 * @params Number: currentInstrument is the instrument user has chosen 
 * 0: piano,1: strings, 2 windwood, 3 synth
 * @params tempo: b.p.m (beats per minute) of the song
 * 
 * When using Web Audio API, there are three steps
 * 1. Make sure the browser can run the API, if it works then the context will be created.
 * 2. Produce sound buffer from outside audio source(mp3, wav,...) then convert it into sound buffer
 * 3. Make a function for playing sound with created buffer. 
 *      3.1 create source buffer
 *      3.2 create filters, gains,... (optional)
 *      3.3 create destination object
 *      3.4 connect all together in order.
 */
	 
 	 // notes from mongoDB
 	var bufferList= new Array(21);
 	//  store selected notes in an array
 	var selectedBufferList =new Array(16);
 	for(var i=0;i<16;i++){
 		selectedBufferList[i]=[];
 	}
 	//  store the index of selectedBufferList array
 	var indexOfSbf =new Array(16);
 	for(var i=0;i<16;i++){
 		indexOfSbf[i]=[];
 	}
 	// audio context
 	var context;
 	// a
 	var BeatOffset =60/tempo;
 	
 	//switch
 	var playSwitch=true;
 	
 	var removeArray=[];
 	
 	// make sure web audio API can be used in different browser
 	function checkUsable(){
 		var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
		if(contextClass){
			context=new contextClass();
			console.log("function can be used here")
		}else{
			console.log("something went wrong");
		}
 	}

	// get the audio from external audio file
	function soundBuffer(index){
		notesSoundArr[index].forEach(function(el,i){ 
		    var request= new XMLHttpRequest();
			request.open('GET', el, true);
			request.responseType = 'arraybuffer';
			
			request.onload = function() { 
			context.decodeAudioData(request.response, function(theBuffer) { 
			       // reverse the order of buffer data so that the highest note can be put on the top of edtion board
			       bufferList[20-i]=theBuffer;
				}, function(){console.log("something wrong")}); 
			}
			request.send();
		});
	}
	
	
	// function of playing audio
	function playSound(buffer) {
	// create a source node
	var source = context.createBufferSource(); 
	source.buffer = buffer; 
	// connect source to destination
	source.connect(context.destination);
	// play the source 
	source.start(0);
	}
	
	
	// Every units on board can be avtived and play the sound with a corresponding note.
	function triggerSound(){
		for(var i=1;i<=16;i++){
		    for(var j=3;j>0;j--){
		        notesArray.forEach(function(el,k){
		            var indexOfJ=j;
		            var indexOfI=i-1;
		            $('#'+i+'_'+j+'_'+el.notes).on('click',function(){
		            	  var sound= bufferList[k+21-7*indexOfJ];
		            	  var indexOfSound =k+21-7*indexOfJ;
		                  // store notes in an array ** should be changed to queue for efficiency reason.
		                  // if division is not selected then adding the note to array, otherwise remove it 
		                  if($(this).attr('class')=="notesContext notesContextClick"){
		                  	 selectedBufferList[indexOfI].pop(sound);
		                  	 indexOfSbf[indexOfI].pop(indexOfSound);
		                  	 console.log(sound+" on to off");
		                  }else{
		                  	selectedBufferList[indexOfI].push(sound);
		                  	indexOfSbf[indexOfI].push(indexOfSound);
		                  	// play sound 
		                    playSound(sound);
		                    console.log(sound);
		                    console.log(sound+" off to on");
		                  }
		                  
		                  $(this).toggleClass('notesContextClick');
		                 
		            })
		        })
		    }
		}
	}
	
	// re-assign selectedBufferList
	function reassignSelectedBuffer(){
		for(var i=0;i<16;i++){
			for(var j=0;j<selectedBufferList[i].length;j++){
				(selectedBufferList[i])[j]=bufferList[(indexOfSbf[i])[j]];
			}
		}
	}
	
							
	

// this function is used for playing notes in the same time, for example, chord.
function playSounds(bufferArr,indexOfArr,setOffTime) {
	let numOfSource=bufferArr.length;
	// Create two sources and play them both together. 
	
	if(playSwitch){
		for(var i=0;i<numOfSource;i++){
		 this['source_'+i+'_'+indexOfArr]=context.createBufferSource();
		 this['source_'+i+'_'+indexOfArr].buffer=bufferArr[i];
		 this['source_'+i+'_'+indexOfArr].connect(context.destination);
		 this['source_'+i+'_'+indexOfArr].start(context.currentTime+setOffTime);
		 removeArray.push(this['source_'+i+'_'+indexOfArr]);
		}
	}else{
		removeArray.forEach(function(el){
			el.stop(0);
		})
		//re-assign the array
		removeArray=[];
	}
	
}
	
// play song ** It is suggested to set time interval in playsound funciton rather than JavaScript timers
function playToggle(){
	let lengthOfSelectedBuffer=selectedBufferList.length;
	$('.button-main-playback').on('click',function(){
		for(let i=0;i<lengthOfSelectedBuffer;i++){
			playSounds(selectedBufferList[i],i,BeatOffset*i);
		}
		//function to make canvas show or hide (pointer animation)
		pointerAnimation();
		
		// turn play button into stop button
		$(this).children().removeClass('fa-play');
		$(this).removeClass('button-main-playback');
		$(this).children().addClass('fa-stop');
		$(this).addClass('button-main-stop');
		$(this).unbind('click');
		playSwitch=false;
		
		$('.button-main-stop').on('click',function(){
			// stop pointer animation
			clearAllTimeOut();
    		stopAnimation();
    		
    		// stop sound 
			// for(let i=0;i<lengthOfSelectedBuffer;i++){
			playSounds(selectedBufferList[0],0,0);
			// }
			
			
			
			
			$(this).children().removeClass('fa-stop');
			$(this).removeClass('button-main-stop');
			$(this).children().addClass('fa-play');
			$(this).addClass('button-main-playback');
			$(this).unbind('click');
			playSwitch=true;
			playToggle();
		})
	})
}

playToggle();


// Remove all noes from selectedBufferList
function removeAllNotes(){
	for(var i=0;i<16;i++){
		selectedBufferList[i]=[];
	}
	
	$('.columes').contents().removeClass('notesContextClick');
}


//function to make canvas show or hide (pointer animation)
function pointerAnimation(){
	
	for(let i=0;i<=16;i++){
		loopFor(i);
	}
	function loopFor(i){
		setTimeout(function(){
		$('#'+'canvas_'+(i+1)).toggleClass('disable');
		$('#'+'canvas_'+(i)).toggleClass('disable');
		},BeatOffset*i*1000);
	}
	
	// setTimeout(function(){
	// $('#'+'canvas_'+(16)).toggleClass('disable');
	// },BeatOffset*16*1000);
	
}

function pause(){
	// pause the song
	
	console.log(source1);
	
	// clear canvas
	
//stop playing sound
}

// This function is used to claer all timeout (waiting queue)
function clearAllTimeOut(){
    var id = window.setTimeout(null,0);
    while (id--) {
       window.clearTimeout(id);
    }
}

// This function is used to make all pointer unvisible
function stopAnimation(){
	for(var i=0;i<16;i++){
		$('#'+'canvas_'+(i)).addClass('disable');
	}
}	