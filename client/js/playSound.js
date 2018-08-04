/**
*@param  selectedBufferList[], Store selected notes in an array
*@paran  bufferList, Notes from mongoDB
*@param  notesArray, Contains 21 notes from c2 to b4
*@param  indexOfSbf, Store the index of selectedBufferList array
*@param  BeatOffset, Interval (second) of each beats. bpm table :https://goo.gl/xqwV6z
*@param  removeArray
*@param  dest
*@param  gainNode
*@param  removeArray
* @funciton pointerAnimation()
* @function playSound()
* 
*/

/* global $ selectedBufferList BeatOffset pointerAnimation clearAllTimeOut stopAnimation removeArray
notesArray bufferList indexOfSbf playSound gainNode dest*/

/**When note division on sequencer is clicked, stores the clicked note in selectedBufferList, vice versa.*/
function triggerSound(){
	for(var i=1;i<=16;i++){
	    for(var j=3;j>0;j--){
	        notesArray.forEach(function(el,k){
	            var indexOfJ=j;
	            var indexOfI=i-1;
	            $('#'+i+'_'+j+'_'+el.notes).on('click',function(){
	            	  var sound= bufferList[k+21-7*indexOfJ];
	            	  var indexOfSound =k+21-7*indexOfJ;
	                  // Store notes in an array
	                  // If division is not selected then adding the note to array, otherwise remove it.
	                  if($(this).attr('class')=="notesContext notesContextClick"){
	                  	 selectedBufferList[indexOfI].pop(sound);
	                  	 indexOfSbf[indexOfI].pop(indexOfSound);
	                  	 //console.log(sound+" on to off");
	                  }else{
	                  	selectedBufferList[indexOfI].push(sound);
	                  	indexOfSbf[indexOfI].push(indexOfSound);
	                    playSound(sound);
	                    // console.log(sound);
	                    // console.log(sound+" off to on");
	                  }
	                  $(this).toggleClass('notesContextClick');
	            })
	        })
	    }
	}
}


/**Switch and control the status of sequencer*/
function playToggle(){
	
	let lengthOfSelectedBuffer=selectedBufferList.length;
	
	$('.button-main-playback').on('click',function(){
		// Play notes in sequence 
		for(let i=0;i<lengthOfSelectedBuffer;i++){
			startPlaying(selectedBufferList[i],i,BeatOffset*i);
		}
		//Start pointer animation
		pointerAnimation();
		
		//Make buttons on console disable when playing the sound
        $('.button-on-edition-console').prop('disabled',true);
		// Turn play button into stop button
		$(this).children().removeClass('fa-play');
		$(this).removeClass('button-main-playback');
		$(this).children().addClass('fa-stop');
		$(this).addClass('button-main-stop');
		$(this).unbind('click');
		
		$('.button-main-stop').on('click',function(){
			// Stop pointer animation
			stopAnimation();
			clearAllTimeOut();
    		// Stop playing the song 
			stopPlaying();
			//recover the console
            $('.button-on-edition-console').prop('disabled',false);
			
			//Turn 'stop' button into 'play' button
			$(this).children().removeClass('fa-stop');
			$(this).removeClass('button-main-stop');
			$(this).children().addClass('fa-play');
			$(this).addClass('button-main-playback');
			$(this).unbind('click');
			
			// Recursive the function
			playToggle();
		})
	})
}

/**
 * Play notes (chord) with a given array
 * @params bufferArr, selectedBufferList
 * @params indexOfArr, index number
 * @params setOffTime, number (second) 
 */

function startPlaying(bufferArr,indexOfArr,setOffTime) {
	// If the program is in 'stop' status, play the sound. Otherwise, stop the sound immediately.
	let numOfSource=bufferArr.length;
	for(var i=0;i<numOfSource;i++){
		 this['source_'+i+'_'+indexOfArr]=context.createBufferSource();
		 this['source_'+i+'_'+indexOfArr].buffer=bufferArr[i];
		 this['source_'+i+'_'+indexOfArr].connect(gainNode);
		 gainNode.connect(context.destination);
		 //this['source_'+i+'_'+indexOfArr].connect(context.destination);
		 this['source_'+i+'_'+indexOfArr].start(context.currentTime+setOffTime);

		 // Stores all sources in this array for making these sources can be accessible.
		 removeArray.push(this['source_'+i+'_'+indexOfArr]);
	}
}

/**
 * Record notes with a given array
 * @params bufferArr, selectedBufferList
 * @params indexOfArr, index number
 * @params setOffTime, number (second) 
 */
function startRecording(bufferArr,indexOfArr,setOffTime) {
	// If the program is in 'stop' status, play the sound. Otherwise, stop the sound immediately.
	let numOfSource=bufferArr.length;
	for(var i=0;i<numOfSource;i++){
		 this['source_'+i+'_'+indexOfArr]=context.createBufferSource();
		 this['source_'+i+'_'+indexOfArr].buffer=bufferArr[i];
		 this['source_'+i+'_'+indexOfArr].connect(dest);
		 this['source_'+i+'_'+indexOfArr].start(context.currentTime+setOffTime);
		 // Stores all sources in this array for making these sources can be accessible.
		 removeArray.push(this['source_'+i+'_'+indexOfArr]);
	}
}

/** Stop playing all notes */
function stopPlaying(){
	removeArray.forEach(function(el){
		el.stop(0);
	})
	//Reassign the array
	removeArray=[];
}

// Make sure web audio API can be used in different browser
checkUsable();
// Create buffer with index number, 0: piano,1: strings, 2 windwood, 3 synth
soundBuffer(0);
triggerSound();
playToggle();



