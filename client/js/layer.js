/**
* @author: Yu-Ning, Chang
* Produce loading animations
* 	  
* @global variables
* ==================
* BeatOffset(number)
*		  
* Code reference: https://www.w3schools.com/howto/howto_js_progressbar.asp
*/
/*global $  BeatOffset */


/**
 * @description Add or remove a loading layer
 */
function loadingControl(){
     $('#loadingLayer').toggleClass('disable');
     $('#music-console').toggleClass('disable');
}

/**
 * @description Show a progress bar when users save their music.
 */
function progressBarOn(){
     $('#loadingLayer').toggleClass('disable');
     $('.loader').addClass('disable');
     $('.loading-text').text('Data processing');
     $('#myProgress').toggleClass('disable');
     showProgress();
     $('#music-console').toggleClass('disable');
}

/**
 * @description Hide the progress bar when users finish data saving.
 */
function progressBarOff(){
    $('.loading-text').text('Loading Instrument Library');
    $('.loader').removeClass('disable');
    $('#loadingLayer').toggleClass('disable');
    $('#myProgress').toggleClass('disable');
    $('#music-console').toggleClass('disable');
    //reset the progress bar
    $('#myBar').css('width','10%'); 
    $('#myBar').text('10%');
}

/**
 * @description Show the progress when processing data.
 */
function showProgress() {
    var timeInterval= BeatOffset*16*1000/100;
    var width = 10;
    
    var offSet = setInterval(runProgress, timeInterval);
    function runProgress() {
        if (width >= 100) {
            clearInterval(offSet);
        } else {
            width++; 
            $('#myBar').css('width',width + '%'); 
            $('#myBar').text( width * 1 + '%');
        }
    }
}