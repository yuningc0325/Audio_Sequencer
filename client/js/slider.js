var rangeBar = $('.rangeBar');
var bpm = $('.bpm-value');

// get the initialised value
var v = rangeBar.attr('value');
// initialise the bpm text
bpm.text(v);

// slide event
rangeBar.on('input', function(){
  bpm.text(this.value);
});
