/**
 * @params Array: notesSoundArr contains 4 instrument arrays
 * notesSoundArr[0]: piano, notesSoundArr[1]: strings, notesSoundArr[2]: windwood, notesSoundArr[3]: synth
 * @params Number: currentInstrument is the instrument user has chosen 
 * 0: piano,1: strings, 2 windwood, 3 synth
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
	 
 	 // store notes sound from mongoDB
 	var bufferList= new Array(21);
 	var context;
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
		            $('#'+i+'_'+j+'_'+el.notes).on('click',function(){
		            	  // play sound 
		                  playSound(bufferList[k+21-7*indexOfJ]);
		            })
		        })
		    }
		}
	}
	
	// Every units on board can be avtived with given style
	function boardActived(){
		for(var i=1;i<=16;i++){
		    for(var j=3;j>0;j--){
		        notesArray.forEach(function(el,k){
		            var indexOfJ=j;
		            $('#'+i+'_'+j+'_'+el.notes).on('click',function(){
		                  $(this).toggleClass('notesContextClick');
		            })
		        })
		    }
		}
	}
	
	
	