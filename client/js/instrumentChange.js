/**
* @author: Yu-Ning, Chang
* Mouse click event about changing instrument.
* 	  
* @global variables
* ==================
*		  
* @global functions
* ==================		  
* loadingControl, soundBuffer, clearAllTimeOut, stopAnimation, volumeInterval, playToggle,
* stopPlaying, reassignSelectedBuffer
* 
*/

/* global $ loadingControl, soundBuffer, clearAllTimeOut, stopAnimation, volumeInterval, playToggle,
* stopPlaying, reassignSelectedBuffer*/

var instruments=['piano','guitar','wind','bass'],
    // Initial index value is one
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
    
    // Create new sound buffer with a given instrument
    soundBuffer(index);
    
	// Stop pointer animation
	clearAllTimeOut();
	stopAnimation();
	
	// Recover volume interval
	volumeInterval();
	
	$('.button-main-stop').children().removeClass('fa-stop');
	$('.button-main-stop').children().addClass('fa-play');
	$('.button-main-stop').addClass('button-main-playback');
	$('.button-main-stop').unbind('click');
	$('.button-main-playback').unbind('click');
	$('.button-main-stop').removeClass('button-main-stop');
	playToggle();
	stopPlaying();
	
    // It needs to wait for soundBuffer finished, after that, the sequencer will be available
    // This function can reassign selected buffer with clicked notes, so it changes sound only.
    setTimeout(function(){
        reassignSelectedBuffer();
        loadingControl();
    },1500);
    
	// Point to the next instrument
    index++;
}); 