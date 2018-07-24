/**
 * @params notesSoundArr contains 4 instrument arrays
 * notesSoundArr[0]: piano, notesSoundArr[1]: strings, notesSoundArr[2]: windwood, notesSoundArr[3]: synth
 * @params notesArray contains 21 notes from c2 to b4
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
 * Code Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 * 
 */
 
 /* global $ tempo notesArray source1 notesSoundArr */

	 
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
 	indexOfSbf =new Array(16);

 for(var i=0;i<16;i++){
 	selectedBufferList[i]=[];
 	indexOfSbf[i]=[];
 }
 
// Make sure that web audio API can be used in different browsers
function checkUsable(){
 	var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
	if(contextClass){
		context=new contextClass();
		console.log("Web Audio API can work in this browser")
	}else{
		console.log("something went wrong");
	}
 }

// Get the audio from external audio file (through url stored in MongoDB)
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
	
	
// This function can play a note with a given audio buffer
function playSound(buffer) {
	// create a source 
	var source = context.createBufferSource(); 
	source.buffer = buffer; 
	// connect source to the destination
	source.connect(context.destination);
	// play the source 
	source.start(0);
}
	
// Reassign the selectedBufferList
function reassignSelectedBuffer(){
	for(let i=0;i<16;i++){
		for(let j=0;j<selectedBufferList[i].length;j++){
			(selectedBufferList[i])[j]=bufferList[(indexOfSbf[i])[j]];
		}
	}
}
							

// Remove all noes from selectedBufferList
function removeAllNotes(){
	for(var i=0;i<16;i++){
		selectedBufferList[i]=[];
	}
	$('.columes').contents().removeClass('notesContextClick');
}



	