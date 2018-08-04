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
/* global $ */

//Create pointer animation
function pointerAnimation(){
	for(let i=0;i<=16;i++){
		setAnimation(i);
	}
	
	function setAnimation(i){
		setTimeout(function(){
		$('#'+'canvas_'+(i+1)).toggleClass('disable');
		$('#'+'canvas_'+(i)).toggleClass('disable');
		},BeatOffset*i*1000);
	}
	
	//Change status from 'play' to 'stop' when play end
	setTimeout(function(){
		//recover the console
        $('.button-on-edition-console').prop('disabled',false);
    	$('.button-main-stop').children().removeClass('fa-stop');
    	$('.button-main-stop').children().addClass('fa-play');
    	$('.button-main-stop').addClass('button-main-playback');
    	$('.button-main-stop').unbind('click');
		$('.button-main-stop').removeClass('button-main-stop');
		playToggle();
	},BeatOffset*16*1000);
}

// This function is used to make all pointer unvisible
function stopAnimation(){
	for(let i=1;i<=16;i++){
		$('#'+'canvas_'+(i)).addClass('disable');
	}
}

// This function is used to claer all timeout (waiting queue)
// Function reference: http://activelab.io/code-snippets/clearing-all-javascript-timeouts
function clearAllTimeOut(){
    var id = window.setTimeout(null,0);
    while (id--) {
       window.clearTimeout(id);
    }
}