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
// mongoose.connect("mongodb://localhost/instrument");
mongoose.connect("mongodb://yuningc0325:Yuyuyu123@ds125322.mlab.com:25322/soundlibrary");

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
    guitarSchema=instrumentSchema,
    bassSchema=instrumentSchema;

var piano = mongoose.model("Piano",pianoSchema),
    guitar = mongoose.model("Guitar",guitarSchema),
    woodwind = mongoose.model("Woodwind",woodwindSchema),
    bass = mongoose.model("Bass",bassSchema);

module.exports=[piano,guitar,woodwind,bass];