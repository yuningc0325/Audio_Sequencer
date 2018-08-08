/**
 * @function (from audio.js)
 * checkUsable  -  Make sure the browser can run the API.
 * soundBuffer  -  Produce sound buffer with index number.
 * reassignSelectedBuffer - Reassign the selectedBufferList.
 * triggerSound -  playing sound with created buffer.
 * playToggle
 * stopPlaying
 * @funcyion (from pointer.js)
 * clearAllTimeOut()
 * stopAnimation()
 * @global loadingControl
 */

/*external variables and functions*/
/* global $ checkUsable soundBuffer triggerSound reassignSelectedBuffer clearAllTimeOut stopAnimation
playToggle stopPlaying loadingControl*/

var instruments=['piano','strings','wind','synth'],
    // Initial index is one
    index=1;

    
$(".instrument-button").on("click",function(){
    // Loading layer and disable buttons
    loadingControl();
    
    if(index==4){index=0;}
    
    var current=instruments[index];
    
    if(index==0){
         var previous=instruments[3];
    }else{
         var previous=instruments[index-1];
    }
    
    // Show next instrument incon and hide others 
    $('#'+current+'-icon').toggleClass('disable');
    $('#'+previous+'-icon').toggleClass('disable');
    $('#'+current+'-name').toggleClass('hidden');
    $('#'+previous+'-name').toggleClass('hidden');
    
    // Create new sound buffer with given instrument
    soundBuffer(index);
    
	// Stop pointer animation
	clearAllTimeOut();
	stopAnimation();
	
	// prevent stopping volume interval
	volumeInterval();
	
	// Reset play toggle and stop all sounds
	$('.button-main-stop').children().removeClass('fa-stop');
	$('.button-main-stop').children().addClass('fa-play');
	$('.button-main-stop').addClass('button-main-playback');
	$('.button-main-stop').unbind('click');
	$('.button-main-playback').unbind('click');
	$('.button-main-stop').removeClass('button-main-stop');
	playToggle();
	stopPlaying();
	
	
    
    // It needs to wait for soundBuffer finished, after that, the sequencer will be available
    // This function can reassign selected buffer with original notes so it changes sound not notes.
    setTimeout(function(){
        reassignSelectedBuffer();
        loadingControl();
    },1500);
    
	// Point to the next instrument
    index++;
}); 

   
/**Add or remove loading layer*/
// function loadingContol(){
//      $('#loadingLayer').toggleClass('disable');
//      $('#music-console').toggleClass('disable');
// }

