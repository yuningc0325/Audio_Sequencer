$('.button-audition').on('click',function(){
	$(this).toggleClass("button-audition-click");
	if($(this).text()==="sound on"){
		$(this).text("sound off");
	}else{
		$(this).text("sound on");
	}
})