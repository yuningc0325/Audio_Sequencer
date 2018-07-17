/**
 * @function (from audio.js)
 * checkUsable  -  Make sure the browser can run the API.
 * soundBuffer  -  Produce sound buffer with index number.
 * triggerSound -  playing sound with created buffer.
 * boardActived -  Clicked division can be actived with a given style. 
 */


var instruments=['piano','strings','wind','synth'];
// strat index is one
var index=1;

// make sure web audio API can be used in different browser
checkUsable();

// create buffer with index number, 0: piano,1: strings, 2 windwood, 3 synth
soundBuffer(0);

// play initial sound(piano)
triggerSound();

// style showing after clicking 
boardActived();


$(document).ready(function(){
    $(".instrument-button").on("click",function(){
        if(index==4){index=0;}
        var current=instruments[index];
        if(index==0){
             var previous=instruments[3];
        }else{
             var previous=instruments[index-1];
        }
        // show next object and hide others 
        $('#'+current+'-icon').toggleClass('disable');
        $('#'+previous+'-icon').toggleClass('disable');
        $('#'+current+'-name').toggleClass('hidden');
        $('#'+previous+'-name').toggleClass('hidden');
        // create corresponding sound buffer
        soundBuffer(index);
    	// Every units on board can be avtived and play the sound with a corresponding note.
        triggerSound();
        index++;
    }); // end-on-click-event
});