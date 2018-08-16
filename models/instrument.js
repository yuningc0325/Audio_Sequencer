var mongoose=require('mongoose');
// mongoDB connection
mongoose.connect("mongodb://localhost/instrument");

var instrumentSchema =new mongoose.Schema({
        name:String,
        notes:[]
    });
    
var pianoSchema=instrumentSchema,
    woodwindSchema=instrumentSchema,
    stringsSchema=instrumentSchema,
    synthSchema=instrumentSchema;

var piano = mongoose.model("Piano",pianoSchema),
    strings = mongoose.model("Strings",stringsSchema),
    woodwind = mongoose.model("Woodwind",woodwindSchema),
    synth = mongoose.model("Synth",synthSchema);

module.exports=[piano,strings,woodwind,synth];
