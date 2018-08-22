/**
 * @author: Yu-Ning, Chang 
 * This file is used to configure routes.
 * 
 * API I use in my code, license details can be found in "node_modules" package.
 * =====================
 * "mongoose": "^5.1.7",https://mongoosejs.com/
 */

var mongoose=require('mongoose');
// mongoDB connection
mongoose.connect("mongodb://localhost/instrument");

// Check connection.
var connectionCheck = mongoose.connection;
connectionCheck.on('error', console.error.bind(console, 'connection error:'));
connectionCheck.once('open', function() {
    console.log("MondoDB is connected.")
});


// Build an instrument schema with a tonality name and a note array. 
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