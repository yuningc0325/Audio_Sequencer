$(document).ready(function(){
    
function setPointer(content) {
    content.fillStyle="#f0ad4e";
    content.beginPath();
    content.moveTo(35.6, 5);
    content.lineTo(20.6, 17);
    content.lineTo(50.6, 17);
    content.fill();
}

for(var i=1;i<=16;i++){
    this['canvas'+i]=document.getElementById('canvas_'+i);
    this['content'+i]=this['canvas'+i].getContext('2d');
    setPointer(this['content'+i]);
}    


})