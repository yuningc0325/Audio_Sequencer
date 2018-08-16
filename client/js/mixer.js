/*global $ MediaRecorder*/

var context,    
    dest,
    mediaRecorder,
    trackBuffer=[],
    stopPlayArray=[],
    chunks=[],
    gainNode,
    gainNode1,
    convolver,
    convolverGain,
    filter1,
    compression,
    speaker,
    BeatOffset=60/tempo;

window.requestAnimationFrame = (function(){ return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
function(callback){
      window.setTimeout(callback, 1000 / 60);
      console.log('requestAnimationFrame work');
    };
})();


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
		gainNode1=context.createGain();
		// create convolver
		convolver=context.createConvolver();
		// create convolver gain
		convolverGain= context.createGain();
		compression = context.createDynamicsCompressor();
		
		//create EQ
		
		filter1=context.createBiquadFilter();
		filter1.type="lowshelf";
		filter1.frequency.value=1000;
		// defalut gain value 
		filter1.gain.value=0;
		
		//User's destination 
		speaker=context.destination;
		
		// filter1=context.createBiquadFilter();
		// filter1.type=filter1.lowshelf;
		// filter1.frequency.value=1000;
		// filter2=context.createBiquadFilter();
		// filter2.type=filter2.highshelf;
		// filter2.frequency.value=100;
		
		console.log("Web Audio API can work in this browser")
	}else{
		console.log("something went wrong");
	}
 }
 
checkUsable();
 
function volumeAdjustment(volume){
	gainNode.gain.value=volume*0.05;
	gainNode1.gain.value=volume*0.05;
} 

function reverbAdjustment(reverb){
	convolverGain.gain.value=reverb*0.05;
}

function bassAdjustment(lowShelf){
	filter1.gain.value=lowShelf*1;
}
 
 
 /**
 *	Get the audio from external audio file(url stored in tracks table) and store buffers in trackBuffer array
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


/**
 * This function can play a note with a given audio buffer
 * @params buffer. audiobuffer  
 * @params canvasIndex, number
 * @params dest. It can be user speaker or media record destination
 */

function playSound(buffer,canvasIndex,dest){
	// create a source 
	var source = context.createBufferSource(); 
	source.buffer = buffer; 
	
	
	// source.connect(filter1);
	var	analyser= context.createAnalyser();
	source.connect(analyser);
	// filter1.connect(analyser);
	analyser.fftSize=512;
	var bufferLength = analyser.frequencyBinCount; 
	var dataArray = new Uint8Array(bufferLength);
	this['content'+canvasIndex].clearRect(0,0,900,100);

	var draw=function(){
		// get data dynamically
		var drawVisual = requestAnimationFrame(draw);
		analyser.getByteFrequencyData(dataArray);
		var barWidth=900/bufferLength*1.5;
		var height;
		var x=0;
		
			for(let j = 0; j < bufferLength; j++) {
				// make the highest bar within max height(100)	
		        height = dataArray[j]*100/256;
		        this['content'+canvasIndex].fillStyle='#7eacac';
		        this['content'+canvasIndex].fillRect(x,100-height/2,barWidth,height/2);
		        x += barWidth + 2;
		}
	}	
	draw();
	
	analyser.connect(filter1);
	filter1.connect(gainNode);
	gainNode.connect(compression);
	source.connect(gainNode1);
	gainNode1.connect(convolver);
	convolver.connect(convolverGain);
	convolverGain.connect(compression);
	
	// analyser.connect(gainNode);
	// source.connect(convolver);
	// gainNode.connect(compression);
	// convolver.connect(convolverGain);
	// convolverGain.connect(compression);
	compression.connect(dest);
	source.start(0);
	
	stopPlayArray.push(source);
}


/**
 * This function can record sound 
 * @params buffer. audiobuffer  
 */


function stopSinglePlay(){
	stopPlayArray.forEach(function(el){
		el.stop(0)	
	})
	stopPlayArray=[];
}

function trackPlayToggle(){
	$('.button-track-playback').on('click',function(){
	
	trackBuffer.forEach(function(el,i,){
			playSound(el,i,speaker);
	});
	
	$(this).children().removeClass('fa-play');
	$(this).removeClass('button-track-playback');
	$(this).children().addClass('fa-stop');
	$(this).addClass('button-track-stop');
	$(this).unbind('click');
	
	
	var autoStop=setTimeout(function(){
		stopSinglePlay();
		$('.button-track-stop').children().removeClass('fa-stop');	
		$('.button-track-stop').children().addClass('fa-play');
		$('.button-track-stop').addClass('button-track-playback');
    	$('.button-track-stop').unbind('click');
		$('.button-track-stop').removeClass('button-track-stop');
		trackPlayToggle();
		// add buffer 1 sec
	},(timeLength+1)*1000);
	
	$('.button-track-stop').on('click',function(){
		// if click stop button, ignore autoStop function
		window.clearTimeout(autoStop);
		stopSinglePlay();
    	$(this).children().removeClass('fa-stop');
		$(this).removeClass('button-track-stop');
		$(this).children().addClass('fa-play');
		$(this).addClass('button-track-playback');
		$(this).unbind('click');
		trackPlayToggle();
	})
})

}


function startInterval(){
	setInterval(function(){
	   var volume=$('#volume').parent().text();
	   var reverb=$('#reverb').parent().text();
	   var bass=$('#Low-shelf').parent().text();
	   volumeAdjustment(volume);
	   reverbAdjustment(reverb);
	   bassAdjustment(bass);
	   console.log('Volume: '+volume);
	   //console.log('Reverb: '+reverb);
	},300);
}



function mix(){
	trackBuffer.forEach(function(el,i,){
			playSound(el,i,dest);
	});
	
	progressBarOn();
	console.log('start recording')
	mediaRecorder.start();
	
	// **mix stop problem 
	setTimeout(function(){
		progressBarOff();
	    mediaRecorder.stop();
	    console.log(mediaRecorder.state+' stop recording');
	},BeatOffset*(16+2)*1000);
}


$('.button-export-tracks').on('click',function(){
	console.log('start mixing');
	mix();
})


// When media recorder start, it pushs blob data into chuncks array
mediaRecorder.ondataavailable = function(event) {
       // push each chunk (blobs) in an array
       chunks.push(event.data);
};	


// When media recorder stop, it reads data from chuncks array and provide user a downlaod address.
mediaRecorder.onstop = function(evt) {
   // Create blob data in audio(wav) type.
   var audioBlob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
   var downloadUrl = URL.createObjectURL(audioBlob);
   // open a new tab with audio player 
   window.open(downloadUrl);
   // reassign the chunks
  chunks=[];
 };


$(document).ready(
	function(){
		startInterval();
		impluseBuffer();
		trackArray.forEach(function(el){
		soundBuffer(el);
		})
		trackPlayToggle();
		
	/**Make the sequencer available. Using setTimeout can make sure the sequencer is ready for user. */
	setTimeout(function(){
		if(noContent){
			console.log('No track')
		}else{
			loadingControl();
		}
	},2500);	
	
	
	setTimeout(function(){
		window.location.reload(true);
	},300000);
})