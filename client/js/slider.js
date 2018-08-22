/**
* @author: Yu-Ning, Chang
* Change value immediately according to the value on range bar.
*/

/* global rangeBar bpm $*/

var rangeBar = $('.rangeBar'),
    bpm = $('.bpm-value');

// Get the initialised value
var v = rangeBar.attr('value');
// Initialise the bpm text
bpm.text(v);

// Slide event
rangeBar.on('input', function(){
  bpm.text(this.value);
});
