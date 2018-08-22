/**
* @author: Yu-Ning, Chang
* Mouse click event about buttons on console (clear, save, leave).
* 	  
* @global variables
* ==================
* selectedBufferList(Array), notesArray(Array), BeatOffset(number)
*		  
* @global functions
* ==================		  
* removeAllNotes, progressBarOn, startRecording, progressBarOff
* 
* Code reference:
* 1.Boris Smus(2013) Web Audio API .O'Reilly Media 
* 2.https://developer.mozilla.org/en/docs/Web/API/Web_Audio_API
*/ 
 
 /* global $
    mediaRecorder selectedBufferList BeatOffset Blob
    removeAllNotes progressBarOn startRecording progressBarOff*/

// Store blob data
var chunks=[];

// Hover effect
$('.button-on-edition-console').on('mouseenter mouseleave',
						function(){
							$(this).children().toggleClass('icon-mainPage-hover');
						});
					
$('#clean-btn').on('click',function(){
                            removeAllNotes();
                    })

$('#save-btn').on('click',function(){
                        saveAudio();
                    })


function saveAudio(){
     // Loading the progress bar
    progressBarOn();
    var lengthOfSelectedBuffer=selectedBufferList.length;
    // Start recording
    mediaRecorder.start();
    console.log(mediaRecorder.state+' start recording......');
	for(let i=0;i<lengthOfSelectedBuffer;i++){
		startRecording(selectedBufferList[i],i,BeatOffset*i);
	}
	
	setTimeout(function(){
	    mediaRecorder.stop();
	    progressBarOff();
	    console.log(mediaRecorder.state+' stop recording');
	},BeatOffset*(lengthOfSelectedBuffer+2)*1000);
    
}

// When the media recorder start, it pushes blob data into chuncks array.
mediaRecorder.ondataavailable = function(event) {
       // push each chunk (blobs) in an array
       chunks.push(event.data);
};	


// When media recorder stop, it reads data from chuncks array and pass it to backend.
mediaRecorder.onstop = function(evt) {
   // Create blob data in audio(wav) type.
   var audioBlob = new Blob(chunks, { 'type' : 'audio/wav; codecs=opus' });
   
   // Use AJAX to pass data to the given route
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
          window.location.href='/user_'+user+'/projects_'+project+'/tracks';
      },
      error: function(err){
          console.log(err);
      }
   })
    //reassign chunnks array
    chunks=[];
};


$('#leave-btn').on('click',function(){
    var user=$(this).data('user');
    var project=$(this).data('project');
    var track=$(this).data('track');
    var redirectUrl='/user_'+user+'/projects_'+project+'/tracks'
    window.location.href=redirectUrl;
})