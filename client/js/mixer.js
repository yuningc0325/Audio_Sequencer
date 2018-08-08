/*global $ MediaRecorder*/


var context,    
    dest,
    mediaRecorder,
    trackBuffer=[],
    gainNode,
    volumeInterval,
    convolver,
    convolverGain,
    filter;


/**Make sure Web Audio API can be used in different browsers*/
function checkUsable(){
 	var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
	if(contextClass){
		context=new contextClass();
		// create media stream destination
		dest=context.createMediaStreamDestination();
		mediaRecorder = new MediaRecorder(dest.stream);

		// create gainNode
		gainNode=context.createGain();
		
		// create convolver
		convolver=context.createConvolver();
		//create convolver gain
		convolverGain= context.createGain();
		
		filter=context.createBiquadFilter();
		filter.type=filter.LOWPASS;
		
		console.log("Web Audio API can work in this browser")
	}else{
		console.log("something went wrong");
	}
 }
 
 
function volumeAdjustment(volume){
	gainNode.gain.value=volume*0.02;
} 

function reverbAdjustment(reverb){
	convolverGain.gain.value=reverb*0.05;
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

function impluseBuffer(){
	    var request= new XMLHttpRequest();
		request.open('GET', '/sound/EchoThiefImpulseResponseLibrary/Underpasses/5UnderpassValencia.wav', true);
		request.responseType = 'arraybuffer';
		request.onload = function() { 
			context.decodeAudioData(request.response, function(theBuffer) { 
			convolver.buffer=theBuffer;
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
	gainNode.connect(context.destination);
	
	// source.connect(context.destination);
	source.start(0);
}


function playSoundMaster(buffer){
	// create a source 
	var source = context.createBufferSource(); 
	source.buffer = buffer; 
	// connect source to the gainNode**1
	// source.connect(gainNode);
	// gainNode.connect(convolver);
	// convolver.connect(convolverGain);
	// convolverGain.connect(context.destination);
	
	//**2
	// source.connect(convolver);
	// convolver.connect(context.destination);
	
	//** soruce to gainNode; convolver to convolver gain to gainNode

	source.connect(gainNode);
	
	if($('#reverb').parent().text()!=0){
		gainNode.connect(convolver)
		convolver.connect(convolverGain);
		convolverGain.connect(context.destination);
		console.log('asdfasd')
		
	}else{
		gainNode.connect(context.destination);
	}
	
	
	// gainNode.connect(context.destination);
	
	// play the source 
	source.start(0);
}


$('.button-play').on('click',function(){
    var wav=$(this).data('url');
    singleTrackBuffer(wav);
})

$('.button-track-playback').on('click',function(){
	
	trackBuffer.forEach(function(el){
			playSoundMaster(el);
	})

})

// test
$('#testBtn').on('click',function(){
	for(var i=0;i<9999;i++){
			window.clearInterval(i);
	}
	console.log('Stop all interval')
})



$('.button-export-tracks').on('click',function(){
	// var volume=$('#volume').parent().text();
	// volumeAdjustment(volume);
	playSound(convolver.buffer)
})


function startInterval(){
	volumeInterval=setInterval(function(){
	   var volume=$('#volume').parent().text();
	   var reverb=$('#reverb').parent().text();
	   volumeAdjustment(volume);
	   reverbAdjustment(reverb);
	   
	   console.log('Volume: '+volume);
	   console.log('Reverb: '+reverb);
	},500)
}

$(document).ready(
	function(){
		checkUsable();
		startInterval();
		impluseBuffer();
		trackArray.forEach(function(el){
		soundBuffer(el);
})
	})