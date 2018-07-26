/* global $ navigator */

/* midiArr is used to store the association between midi input and buffer context (index of BufferList) */
var midiArr ={
m48:[20,1,"c"],
m50:[19,1,"d"],
m52:[18,1,"e"],
m53:[17,1,"f"],
m55:[16,1,"g"],
m57:[15,1,"a"],
m59:[14,1,"b"],
m60:[13,2,"c"],
m62:[12,2,"d"],
m64:[11,2,"e"],
m65:[10,2,"f"],
m67:[9,2,"g"],
m69:[8,2,"a"],
m71:[7,2,"b"],
m72:[6,3,"c"],
m74:[5,3,"d"],
m76:[4,3,"e"],
m77:[3,3,"f"],
m79:[2,3,"g"],
m81:[1,3,"a"],
m83:[0,3,"b"]
};

var indexOfBar=1;

// request MIDI access
if (navigator.requestMIDIAccess) {
    console.log('this browser support MIDI API')
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    $('#midiAccess').toggleClass('disable');
    console.log(midiAccess);
    for (var input of midiAccess.inputs.values()){
        input.onmidimessage = useMIDIMessage;
    }
}

function useMIDIMessage(midiMessage) {

    var command = midiMessage.data[0];
    var note = midiMessage.data[1];
    var velocity = (midiMessage.data.length > 2) ? midiMessage.data[2] : 0; 

        switch (command) {
            case 144: // noteOn
                if (velocity >50) {
                    noteOn(note, velocity);
                } else {
                    noteOff(note);
                }
                break;
            case 128: // noteOff
                noteOff(note);
                break;
        }
    
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function noteOn(note){
    var noteToObject= 'm'+note;
    var indexOfMidiSound=midiArr[noteToObject][0];
    var midiSound=bufferList[indexOfMidiSound];
    //
   
    triggerSequence(noteToObject,midiSound,indexOfMidiSound);
    
}

function triggerSequence(ob,midiSound,indexOfMidiSound){
    //reset the index of bar
    if(indexOfBar==17){
        indexOfBar=1;
    }
    if( $('#'+indexOfBar+'_'+midiArr[ob][1]+'_'+midiArr[ob][2]).attr('class')=="notesContext notesContextClick"){
	                  	 selectedBufferList[indexOfBar-1].pop(midiSound);
	                  	 indexOfSbf[indexOfBar-1].pop(indexOfMidiSound);
	                  	 //console.log(sound+" on to off");
	                  }else{
	                  	selectedBufferList[indexOfBar-1].push(midiSound);
	                  	indexOfSbf[indexOfBar-1].push(indexOfMidiSound);
	                   // playSound(sound);
	                    // console.log(sound);
	                    // console.log(sound+" off to on");
	                  }
     $('#'+indexOfBar+'_'+midiArr[ob][1]+'_'+midiArr[ob][2]).toggleClass('notesContextClick');
      playSound(midiSound);
     indexOfBar++;
    
}

function noteOff(note){
    console.log('off');
}