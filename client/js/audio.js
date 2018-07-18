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
	 
 	 // notes from mongoDB
 	var bufferList= new Array(21);
 	//  store selected notes in an array
 	var selectedBufferList =new Array(16);
 	for(var i=0;i<16;i++){
 		selectedBufferList[i]=[];
 	}
 	
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
		            var indexOfI=i-1;
		            $('#'+i+'_'+j+'_'+el.notes).on('click',function(){
		            	  var sound= bufferList[k+21-7*indexOfJ];
		            	  // play sound 
		                  playSound(sound);
		                  // store notes in an array ** should be changed to queue for efficiency reason.
		                  // if division is not selected then adding the note to array, otherwise remove it 
		                  if($(this).attr('class')=="notesContext notesContextClick"){
		                  	 selectedBufferList[indexOfI].pop(sound);
		                  }else{
		                  	selectedBufferList[indexOfI].push(sound);
		                  }
		                 
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
		                  // store clicked notes in a queue
		                  
		            })
		        })
		    }
		}
	}
	
	
	
							
	// function playSeveralBuffer(){
	// 	for(var i=0;i<10;i++)
	// 	playSound(bufferList[i]);
		
	// }		
	
// play sounds together	

// var bufferLoader;

// function init() {
// bufferLoader = new BufferLoader( context,
//         [
//           '/sound/piano/c2.mp3',
// 		  '/sound/piano/e2.mp3',
//         ],
//         finishedLoading
// 		);
//     bufferLoader.load();
// }

// this function is used for playing notes in the same time, for example, chord.
function playSounds(bufferArr) {
	let numOfSource=bufferArr.length;
	// Create two sources and play them both together. 
	for(var i=0;i<numOfSource;i++){
		 this['source'+i]=context.createBufferSource();
		 this['source'+i].buffer=bufferArr[i];
		 this['source'+i].connect(context.destination);
		 this['source'+i].start(0);
	}
}
	
	
	
 $('.button-main-playback').on('click',function(){
 							  // Play one bar ** should play all bars in tempo
 							  // play note or chord in an order (bar1 to bar 16) ** it is supposed to play in a given tempo
 							  // The situation now is playing almost in the same time!!! lame
 								 setTimeout(function(){playSounds(selectedBufferList[0]);},500);
 							  	 setTimeout(function(){playSounds(selectedBufferList[1]);},1000);
 							  	 setTimeout(function(){playSounds(selectedBufferList[2]);},1500);
 							  	 setTimeout(function(){playSounds(selectedBufferList[3]);},2000);
 							  	 setTimeout(function(){playSounds(selectedBufferList[4]);},2500);
 							  	 setTimeout(function(){playSounds(selectedBufferList[5]);},3000);
 							  	 setTimeout(function(){playSounds(selectedBufferList[6]);},3500);
 							  	 setTimeout(function(){playSounds(selectedBufferList[7]);},4500);
 							  	 setTimeout(function(){playSounds(selectedBufferList[8]);},5000);
 							  	 setTimeout(function(){playSounds(selectedBufferList[9]);},5500);
 							  	 setTimeout(function(){playSounds(selectedBufferList[10]);},6000);
 							  	 setTimeout(function(){playSounds(selectedBufferList[11]);},6500);
 							  	 setTimeout(function(){playSounds(selectedBufferList[12]);},7000);
 							  	 setTimeout(function(){playSounds(selectedBufferList[13]);},7500);
 							  	 setTimeout(function(){playSounds(selectedBufferList[14]);},8000);
 							  	 setTimeout(function(){playSounds(selectedBufferList[15]);},8500);
							})










