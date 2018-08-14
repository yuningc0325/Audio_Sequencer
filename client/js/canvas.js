
// initialise the canvas
// var canvas = document.getElementById('canvas_1');
// var pen= canvas.getContext('2d');

// console.log('canvas pen created!')

for(let i=0;i<numOftrack;i++){
    this['canvas'+i]=document.getElementById('canvas_'+i);
    this['content'+i]=this['canvas'+i].getContext('2d');
    defaultSoundVisual(this['content'+i]);
}    


function defaultSoundVisual(content){
    var w=900/256*1.5;
    var x=0;
    for(var i = 0; i < 256; i++) {
    		content.fillStyle='#d4d4d4';
    		content.fillRect(x,80,w,30);
            x += w + 2;
          }
}


// // draw something
// pen.fillRect(300,300,100,100);