var express=require('express'),
    router=express.Router(),
    pool=require('../models/databasePool.js'),
    instrumentSchema=require("../models/instrument.js"),
    multer      =require("multer");
     
var piano = instrumentSchema[0],
    strings = instrumentSchema[1],
    woodwind = instrumentSchema[2],
    synth = instrumentSchema[3];
    
    
//https://www.npmjs.com/package/multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.wav')
  }
})

var upload = multer({ storage: storage });
var uploadType = upload.single('audioData');

router.get("/user_:user/projects_:project/tracks_:track",function(req, res) {
    var userID      =req.params.user,
        projectID   =req.params.project,
        trackID     =req.params.track,
        trackName   =null,
        instrument  =null, // get from tracks table
        tonality    =null, // get from projects table
        tempo       =null,//  get from projects table
        notesSoundArr  = new Array(4);// array with instruments notes array get sound from mongoDB
     
    // query the tempo and tonality 
    pool.query('SELECT * FROM projects WHERE project_id=$1',[projectID], (err, result) => {
    if(err){console.log(err);}
    tonality=result.rows[0].tonality;
    tempo=result.rows[0].tempo;

    var tonalityString= String(tonality).trim();
    
        piano.find({name:tonalityString},function(err,result){
        if(err){console.log(err)}
        notesSoundArr[0]=result[0].notes;
        });
        
        strings.find({name:tonalityString},function(err,result){
        if(err){console.log(err)}
        notesSoundArr[1]=result[0].notes;
        });
        
        woodwind.find({name:tonalityString},function(err,result){
        if(err){console.log(err)}
        notesSoundArr[2]=result[0].notes;
        });
        
        synth.find({name:tonalityString},function(err,result){
        if(err){console.log(err)}
        notesSoundArr[3]=result[0].notes;
        });
    });
    
    // query the instrument and track name 
    pool.query('SELECT * FROM tracks WHERE track_id=$1',[trackID], (err, result) => {
    if(err){console.log(err);}
    instrument=result.rows[0].instrument;
    trackName=result.rows[0].track_name;
    }); 
    
    setTimeout(function(){
         res.render("main",{notesSoundArr:notesSoundArr,
                            userID:userID,
                            projectID:projectID,
                            trackID:trackID,
                            trackName:trackName,
                            tonality:tonality,
                            tempo:tempo});
    },1500);
   
});

//upload blob
router.put("/user_:user/projects_:project/tracks_:track",uploadType,function(req,res,next){
    // var userID      =req.params.user,
    //     projectID   =req.params.project,
    var trimAudioUrl=req.file.path.replace('client',"");
    pool.query('UPDATE tracks SET audio=$1 WHERE track_id=$2',[trimAudioUrl,req.params.track],(err,result)=>{
        if(err){console.log(err);}
        // console.log(trimAudioUrl);
        res.send(200);
    })
});    

module.exports=router;