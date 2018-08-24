/**
* @author: Yu-Ning, Chang
* Process audio such as playing, mixing, recording and sound adjustment through HTML5 Web Audio API
* (For tracks)	  
* @global variables
* ==================
* tempo(number), timeLength(number), trackArray(Array), noContent(Boolean), width(number)
*		  
* @global functions
* ==================		  
* progressBarOn progressBarOff loadingControl
* 
* Code reference:
* 1.Boris Smus(2013) Web Audio API .O'Reilly Media 
* 2.https://developer.mozilla.org/en/docs/Web/API/Web_Audio_API
* 
*/
/*global $ tempo timeLength trackArray noContent progressBarOn progressBarOff loadingControl width
	Blob URL MediaRecorder*/
	
var context,
    dest,
    mediaRecorder,
    trackBuffer=[],
    stopPlayArray=[],
    chunks=[],
    gainNode,
    gainNodeTmp,
    convolver,
    convolverGain,
    lowShelfEQ,
    compression,
    speaker,
    BeatOffset=60/tempo;

/**
 * @description This function can check if HTML5 web audio API is compatible with users' browser or not.
 */
function checkUsable(){
 	var contextClass = (window.AudioContext || window.webkitAudioContext ||
 			window.mozAudioContext || window.oAudioContext || window.msAudioContext);
	if(contextClass){
		context=new contextClass();
		// Create a media stream destination node
		dest=context.createMediaStreamDestination();
		mediaRecorder = new MediaRecorder(dest.stream);
		// Create a master gain node
		gainNode=context.createGain();
		// Create a temporary gain node
		gainNodeTmp=context.createGain();
		// Create a convolver(reverb) node
		convolver=context.createConvolver();
		// Create a convolver(reverb) gain node
		convolverGain= context.createGain();
		// Create a dynamical compression node
		compression = context.createDynamicsCompressor();
		
		// Create a lowshelf filter node
		lowShelfEQ=context.createBiquadFilter();
		lowShelfEQ.type="lowshelf";
		lowShelfEQ.frequency.value=1000;
		// Assign lowShelfEQ a default value
		lowShelfEQ.gain.value=0;
		
		// Create a destination node (user's speaker)
		speaker=context.destination;
		console.log("Web Audio API can work in this browser")
	}else{
		console.log("something went wrong");
	}
 }

checkUsable();

/**
 * @description This function can adjust the sound volume.
 * @param volume. Number from 0-100
 */
function volumeAdjustment(volume){
	gainNode.gain.value=volume*0.05;
	gainNodeTmp.gain.value=volume*0.05;
} 
/**
 * @description This function can adjust the level of reverb. 
 * @param reverb. Number from 0-100
 */
function reverbAdjustment(reverb){
	convolverGain.gain.value=reverb*0.05;
}
/**
 * @description This function can adjust the level of lowShelf. 
 * @param lowShelf. Number from -40 to 40
 */
function bassAdjustment(lowShelf){
	lowShelfEQ.gain.value=lowShelf*1;
}
 
 
 /**
 *	@description Get an audio buffer through URL and store buffers in the trackBuffer array which
 *  can be used in other functions. 
 *	@params url. String
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

/**
 *	@description Get an audio buffer through URL and assign the buffer to convolver node.
 */
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
 * @description This function can play sound with a given audio buffer
 * @params buffer. Audiobuffer  
 * @params canvasIndex, Number
 * @params dest. It can be a user's speaker or a media record destination.
 */

function playSound(buffer,canvasIndex,dest){
	// Create a source 
	var source = context.createBufferSource(); 
	source.buffer = buffer; 
	
	// Create an analyser node
	var	analyser= context.createAnalyser();
	analyser.fftSize=512;
	var bufferLength = analyser.frequencyBinCount; 
	var dataArray = new Uint8Array(bufferLength);
	// When canvas starts drawing, it will clear all rectangle first.
	var cnv=document.getElementById('canvas_'+canvasIndex);
    var ct=cnv.getContext('2d');
	
	// this['content'+canvasIndex].clearRect(0,0,900,100);
	ct.clearRect(0,0,900,100);
	
	/**
	 * @description Draw a spectrum on the canvas dynamically.
	 */
	var draw=function(){
		// Draw a spectrum dynamically
		var drawVisual = requestAnimationFrame(draw);
			analyser.getByteFrequencyData(dataArray);
		var barWidth=width/bufferLength*1.5,
		    height,
			x=0;
		for(let j = 0; j < bufferLength; j++) {
	        height = dataArray[j]*100/256;
	        // this['content'+canvasIndex].fillStyle='#7eacac';
	        // this['content'+canvasIndex].fillRect(x,100-height/2,barWidth,height/2);
	        ct.fillStyle='#7eacac';
	        ct.fillRect(x,100-height/2,barWidth,height/2);
	        x += barWidth + 2;
		}
	}	
	
	draw();
	
	// Connect source to analyser node.
	source.connect(analyser);
	
	// Connect the analyser node to the lowShelfEQ node.
	analyser.connect(lowShelfEQ);
	// Connect the lowShelfEQ node to the gain node.
	lowShelfEQ.connect(gainNode);
	// Connect the gain node to the compression node.
	gainNode.connect(compression);
	// Connect the source to the temporary gain node.
	source.connect(gainNodeTmp);
	// Connect the temporary gain node to the convolver node.
	gainNodeTmp.connect(convolver);
	// Connect the convolver node to the convolver gain node.
	convolver.connect(convolverGain);
	// Connect the convolver gain node to the compression node.
	convolverGain.connect(compression);
	// Connect the compression node to the destination node.
	compression.connect(dest);
	// Start playing 
	source.start(0);
	
	// Push all source object which is ready to be deleted to stopPlayArray.
	stopPlayArray.push(source);
}


/**
 * @description Stop playing all track
 */

function stopSinglePlay(){
	stopPlayArray.forEach(function(el){
		el.stop(0)	
	})
	stopPlayArray=[];
}

/**
 * @description Control click event of play button.
 */
function trackPlayToggle(){
	// 'Play' button event
	$('.button-track-playback').on('click',function(){
		trackBuffer.forEach(function(el,i){
				playSound(el,i,speaker);
		});
		
		$(this).children().removeClass('fa-play');
		$(this).removeClass('button-track-playback');
		$(this).children().addClass('fa-stop');
		$(this).addClass('button-track-stop');
		$(this).unbind('click');
		
		// If a track finishs playing, it will automatically stop.
		var autoStop=setTimeout(function(){
			stopSinglePlay();
			$('.button-track-stop').children().removeClass('fa-stop');	
			$('.button-track-stop').children().addClass('fa-play');
			$('.button-track-stop').addClass('button-track-playback');
	    	$('.button-track-stop').unbind('click');
			$('.button-track-stop').removeClass('button-track-stop');
			trackPlayToggle();
		// Plus one second for preventing the record from being cut off abruptly.
		},(timeLength+1)*1000);
	
		// 'Stop' button event
		$('.button-track-stop').on('click',function(){
			// If stop button is clicked, 'autoStop' function should be interrupted.
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

/**
 * @description Capture value from the corresponding knob every 0.3sec.
 */
function startInterval(){
	setInterval(function(){
	   var volume=$('#volume').parent().text();
	   var reverb=$('#reverb').parent().text();
	   var bass=$('#Low-shelf').parent().text();
	   volumeAdjustment(volume);
	   reverbAdjustment(reverb);
	   bassAdjustment(bass);
	   console.log('Volume: '+volume);
	},300);
}


/**
 * @description Mix all track
 */
function mix(){
	
	stopSinglePlay();
	
	trackBuffer.forEach(function(el,i,){
			playSound(el,i,dest);
	});
	
	progressBarOn();
	console.log('start recording')
	mediaRecorder.start();
	
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


// When the media recorder start, it pushes blob data into chuncks array.
mediaRecorder.ondataavailable = function(event) {
       chunks.push(event.data);
};	


// When the media recorder stop, it reads data from chuncks array and provides users a downlaod address.
mediaRecorder.onstop = function(evt) {
   // Create blob data in audio(wav) type.
   var audioBlob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' }),
	   downloadUrl = URL.createObjectURL(audioBlob);
   // Open a new tab with an audio player 
   window.open(downloadUrl);
   // Reassign the chunks
  chunks=[];
}


$(document).ready(
	function(){
		startInterval();
		impluseBuffer();
		trackArray.forEach(function(el){
			soundBuffer(el);
		})
		trackPlayToggle();
		
	/**
	 * @description Make the sequencer available.
	 * Using setTimeout can make sure the sequencer is ready for user.
	 */
	setTimeout(function(){
		if(noContent){
			console.log('No track')
		}else{
			loadingControl();
		}
	},2000);	
	
})