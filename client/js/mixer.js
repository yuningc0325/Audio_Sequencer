/*global $ MediaRecorder*/


var context,    
    dest,
    mediaRecorder,
    trackBuffer=[],
    gainNode;


trackArray.forEach(function(el){
	soundBuffer(el);
})


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
 
 
function volumeAdjustment(volume){
	gainNode.gain.value=volume*0.1;
} 
 
 
 /**
 *	Get the audio from external audio file (url stored in tracks table)
 *	@params address. url
 */
function soundBuffer(url){
	    var request= new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function() { 
			context.decodeAudioData(request.response, function(theBuffer) { 
			   trackBuffer.push(theBuffer);			
			   }, function(err){console.log(err)}); 
		}
		request.send();
}

function singleTrackBuffer(url){
	    var request= new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function() { 
			context.decodeAudioData(request.response, function(theBuffer) { 
			   playSound(theBuffer);		
			   }, function(err){console.log(err)}); 
		}
		request.send();
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

checkUsable();

$('.button-play').on('click',function(){
    var wav=$(this).data('url');
    singleTrackBuffer(wav);
})

$('.button-track-playback').on('click',function(){
	trackBuffer.forEach(function(el){
			playSound(el);
	})

})

// test
$('.button-export-tracks').on('click',function(){
	var volume=$('#volume').parent().text();
	volumeAdjustment(volume);
	console.log(volume);
})

