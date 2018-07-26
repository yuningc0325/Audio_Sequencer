/**
 * @function removeAllNotes is used to clean all notes on edition board
 * 
 * 
 */ 
 
 /* global $ removeAllNotes*/
 
var loop=true; 
 
$('.button-on-edition-console').on('mouseenter mouseleave',
						function(){
							$(this).children().toggleClass('icon-mainPage-hover');
						})
					
// clear all clicked notes and remove them from bufferList
$('#clean-btn').on('click',function(){
    removeAllNotes();
})

// $('#myonoffswitch').on('change',function(){
//     if($('#myonoffswitch').prop('checked')){
//         loop=true;
//         // $('#myonoffswitch').prop('checked',false);
//     }else{
//         loop=false;
//         $('#myonoffswitch').prop('checked',true);
//     }
// })




$('#export-btn').on('click',function(){
    alert(loop);
})