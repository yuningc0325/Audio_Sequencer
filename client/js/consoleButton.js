/**
 * Reference: MDN Web Doc
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/ondataavailable
 */ 
 
 /* global $
    parameters- mediaRecorder selectedBufferList BeatOffset Blob
    functions-  removeAllNotes progressBarOn startRecording progressBarOff*/

// Chunks array can store blob data
var chunks=[];

// Icon hover effect 
$('.button-on-edition-console').on('mouseenter mouseleave',
						function(){
							$(this).children().toggleClass('icon-mainPage-hover');
						})
					
// Clear all clicked notes and remove them from bufferList
$('#clean-btn').on('click',function(){
    removeAllNotes();
})

// Audio Process including recording sound from sequencer and audio data conversion  
$('#save-btn').on('click',function(){
   saveAudio();
})


function saveAudio(){
     // loading progress bar
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
	},BeatOffset*(lengthOfSelectedBuffer+1)*1000);
    
}

// When media recorder start, it pushs blob data into chuncks array
mediaRecorder.ondataavailable = function(event) {
       // push each chunk (blobs) in an array
       chunks.push(event.data);
};	


// When media recorder stop, it reads data from chuncks array and provide user a downlaod address.
mediaRecorder.onstop = function(evt) {
   // Create blob data in audio(wav) type.
   var audioBlob = new Blob(chunks, { 'type' : 'audio/wav; codecs=opus' });
   
   // Using AJAX to pass data to a given route
   var user=$('#save-btn').data('user');
   var project=$('#save-btn').data('project');
   var track=$('#save-btn').data('track');
   var url= '/user_'+user+'/projects_'+project+'/tracks_'+track;
   
   var audioData = new FormData();
   audioData.append('audioData',audioBlob);
   $.ajax({
      method:'PUT',
      url:url,
      data:audioData,
      processData: false,
      contentType: false,
      
      success: function(){
          console.log('Ajax pass wav file');
      },
      error: function(err){
          console.log(err);
      }
   })
   
//reassign chunnks array
  chunks=[];
 };

