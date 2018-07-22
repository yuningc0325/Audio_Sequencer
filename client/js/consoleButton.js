/**
 * @function removeAllNotes is used to clean all notes on edition board
 * 
 * 
 */ 
$('.button-on-edition-console').on('mouseenter mouseleave',
						function(){
							$(this).children().toggleClass('icon-mainPage-hover');
						})
					
// clear all clicked notes and remove them from bufferList
$('#clean-btn').on('click',function(){
    
    removeAllNotes();
})

$('#export-btn').on('click',function(){
    // 
    
})