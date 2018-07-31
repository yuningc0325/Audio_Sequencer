// Add or remove loading layer
function loadingControl(){
     $('#loadingLayer').toggleClass('disable');
     // all button should be disable
     $('#music-console').toggleClass('disable');
}

// Add or remove loading layer
function progressBarOn(){
     $('#loadingLayer').toggleClass('disable');
     $('.loader').addClass('disable');
     $('.loading-text').text('Data processing');
     $('#myProgress').toggleClass('disable');
     move();
     // all button should be disable
     $('#music-console').toggleClass('disable');
}

function progressBarOff(){
    $('.loading-text').text('Loading Instrument Library');
    $('.loader').removeClass('disable');
    $('#loadingLayer').toggleClass('disable');
    $('#myProgress').toggleClass('disable');
    
    $('#music-console').toggleClass('disable');
    
    $('#myBar').css('width','10%'); 
    $('#myBar').text('10%');
}

function move() {
    // var elem = document.getElementById("myBar"); 
    var width = 10;
    var id = setInterval(frame, 100);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++; 
            $('#myBar').css('width',width + '%'); 
            $('#myBar').text( width * 1 + '%');
        }
    }
}