/**
* @author: Yu-Ning, Chang
* Produce sound spectrums through HTML5 canvas.
* @global numOftrack(number)
*/
/* global numOftrack*/

      //Width of a track.
const width=900,
      //Number of bars showing on each track. (Same as frequencyBinCount)
      numOfBar=256;
      

for(let i=0;i<numOftrack;i++){
    this['canvas'+i]=document.getElementById('canvas_'+i);
    this['content'+i]=this['canvas'+i].getContext('2d');
    defaultSoundVisual(this['content'+i]);
}    

/**
 * @description This function can draw default spectrums (Before clicking play button)
 * @param content. Canvas context object
 */
function defaultSoundVisual(content){
    var w=width/numOfBar*1.5,
        x=0;
    for(let i = 0; i < 256; i++) {
    		content.fillStyle='#d4d4d4';
    		content.fillRect(x,80,w,30);
            x += w + 2;
          }
}