
/* global $
    parameters- BeatOffset*/

/**Add or remove loading layer*/
function loadingControl(){
     $('#loadingLayer').toggleClass('disable');
     // all button should be disable
     $('#music-console').toggleClass('disable');
}

/**Show progress bar when user save their music*/
function progressBarOn(){
     $('#loadingLayer').toggleClass('disable');
     $('.loader').addClass('disable');
     $('.loading-text').text('Data processing');
     $('#myProgress').toggleClass('disable');
     showProgress();
     // all button should be disable
     $('#music-console').toggleClass('disable');
}

/**Hide progress bar when user save their music*/
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


function showProgress() {
    // Time that every 1% progress costs 
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