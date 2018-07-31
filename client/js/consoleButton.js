/**
 * @function removeAllNotes is used to clean all notes on edition board
 * 
 * 
 */ 
 
 /* global $ removeAllNotes*/
 
var chunks=[];

// icon hover effect 
$('.button-on-edition-console').on('mouseenter mouseleave',
						function(){
							$(this).children().toggleClass('icon-mainPage-hover');
						})
					
// clear all clicked notes and remove them from bufferList
$('#clean-btn').on('click',function(){
    removeAllNotes();
})


$('#export-btn').on('click',function(){
});

$('#save-btn').on('click',function(){
    // loading layer
    progressBarOn();
    let lengthOfSelectedBuffer=selectedBufferList.length;
    // start recording
    mediaRecorder.start();
    console.log(mediaRecorder.state+' start recording......');
    // produce sound and use startRecording function to make sound connect to mediaStream destination
	for(let i=0;i<lengthOfSelectedBuffer;i++){
		startRecording(selectedBufferList[i],i,BeatOffset*i);
	}
	// **Time spent on recording should be dynamic.
	setTimeout(function(){
	    mediaRecorder.stop();
	    progressBarOff();
	    console.log(mediaRecorder.state+' stop recording');
	},BeatOffset*lengthOfSelectedBuffer*1000);
    
})

// When media recorder start, it pushs recorded data into chuncks array
mediaRecorder.ondataavailable = function(evt) {
       // push each chunk (blobs) in an array
       chunks.push(evt.data);
};	


// When media recorder stop, it reads data from chuncks array and provide user a downlaod address.
mediaRecorder.onstop = function(evt) {
   // Make blob out of our blobs, and open it.
   var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
   var audioURL= URL.createObjectURL(blob);
   
   // Through AJAX to pass data to a given route
   var user=$('#save-btn').data('user');
   var project=$('#save-btn').data('project');
   var track=$('#save-btn').data('track');
   var url= '/user_'+user+'/projects_'+project+'/tracks_'+track;
   $.ajax({
      type:'put',
      data:{str:audioURL},
      url:url,
      success: function(result){
          console.log('ajax work '+result);
      },
      error: function(er){
          console.log(er);
      }
   });
   
   
   
   //reassign chunnk array
   chunks=[];
//   $('#export-btn').on('click',function(){
//       var createdBuffer;
//       var request1= new XMLHttpRequest();
// 		request1.open('GET', audioURL, true);
// 		request1.responseType = 'arraybuffer';
// 		request1.onload = function() { 
// 			context.decodeAudioData(request1.response, function(blob) { 
// 		       // reverse the order of buffer data so that the highest note can be put on the top of edtion board
		       
// 		       var arrayBuffer;
//                 var fileReader = new FileReader();
//                 fileReader.onload = function(event) {
//                     arrayBuffer = event.target.result;
//                 };
                
//                 fileReader.readAsArrayBuffer(blob);

		       
// 		       createdBuffer=blob;
// 			   }, function(err){console.log(err)}); 
// 		}
// 		request1.send();
       
       
       
       
//       var audio =new Audio(audioURL);
//       audio.play();
//   }) ;
    
    console.log(blob);
 };

