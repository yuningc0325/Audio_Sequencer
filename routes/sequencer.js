/**
 * @author: Yu-Ning, Chang 
 * This file is used to configure project routes.
 * 
 * API I use in my code: (license details can be found in "node_modules" package.)
 * =====================
 * "express": "^4.16.3"
 * "multer": "^1.3.1", //https://www.npmjs.com/package/multer
 */

var express=require('express'),
    router=express.Router(),
    // Use pool configured in databasePool.js to execute postgreSQL command.
    pool=require('../models/databasePool.js'),
    // Use mongoose schema configured in databasePool.js to execute Mongo command.
    instrumentSchema=require("../models/instrument.js"),
    multer      =require("multer");

     
var piano = instrumentSchema[0],
    guitar = instrumentSchema[1],
    woodwind = instrumentSchema[2],
    bass = instrumentSchema[3];
    
    
var storage = multer.diskStorage({
  // It defines where the file should be stored
  destination: function (req, file, callback) {
    // For server
    callback(null, 'client/upload/')
    // For local
    // callback(null,'client/upload_local/')
  },
  // It defines the file name.
  filename: function (req, file, callback) {
    callback(null, Date.now() + '.wav')
  }
})

var upload = multer({ storage: storage });
var uploadType = upload.single('audioData');


/**
 * "GET" request
 * Render the sequencer page.
 */ 
router.get("/user_:user/projects_:project/tracks_:track",function(req, res) {
    var userID      =req.params.user,
        projectID   =req.params.project,
        trackID     =req.params.track,
        trackName   =null,
        instrument  =null, 
        tonality    =null, 
        tempo       =null,
        // Notes with corresponding tonality will be stored in this array
        // notesSoundArr[0]: piano,  notesSoundArr[1]: strings,  notesSoundArr[2]: woodwind,  notesSoundArr[3]: synth
        notesSoundArr  = new Array(4);
     
    pool.query('SELECT * FROM projects WHERE project_id=$1',[projectID], (err, result) => {
        if(err){console.log(err);}
        tonality=result.rows[0].tonality;
        tempo=result.rows[0].tempo;
        
        // Remove whitespace
        var tonalityString= String(tonality).trim();

        piano.find({name:tonalityString},function(err,result){
            if(err){console.log(err)}
            notesSoundArr[0]=result[0].notes;
        });
        
        guitar.find({name:tonalityString},function(err,result){
            if(err){console.log(err)}
            notesSoundArr[1]=result[0].notes;
        });
        
        woodwind.find({name:tonalityString},function(err,result){
            if(err){console.log(err)}
            notesSoundArr[2]=result[0].notes;
        });
        
        bass.find({name:tonalityString},function(err,result){
            if(err){console.log(err)}
            notesSoundArr[3]=result[0].notes;
        });
    });
    
    pool.query('SELECT * FROM tracks WHERE track_id=$1',[trackID], (err, result) => {
        if(err){console.log(err);}
        instrument=result.rows[0].instrument;
        trackName=result.rows[0].track_name;
    }); 
    
    // Render sequencer page and pass data to sequencer.ejs.
    setTimeout(function(){
         res.render("sequencer",{notesSoundArr:notesSoundArr,
                            userID:userID,
                            projectID:projectID,
                            trackID:trackID,
                            trackName:trackName,
                            tonality:tonality,
                            tempo:tempo});
    },1500);
});


/**
 * "PUT" request
 *  Update track details and store the blob with 'WAV' format produced by users.
 */ 
router.put("/user_:user/projects_:project/tracks_:track",uploadType,function(req,res,next){
    var trimAudioUrl=req.file.path.replace('client',"");
    pool.query('UPDATE tracks SET audio=$1 WHERE track_id=$2',[trimAudioUrl,req.params.track],(err,result)=>{
        if(err){console.log(err);}
        res.send(200);
    })
});    

module.exports=router;