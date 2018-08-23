/**
 * @author: Yu-Ning, Chang 
 * This file is used to configure project routes.
 * 
 * API I use in my code: (license details can be found in "node_modules" package.)
 * =====================
 * "express": "^4.16.3"
 */
var express=require('express'),
    router=express.Router(),
    // Use pool configured in databasePool.js to execute postgreSQL command.
    pool=require('../models/databasePool.js');

/**
 * "GET" request
 * Render the track page.
 */ 
router.get("/user_:user/projects_:project/tracks",function(req, res) {
  var userID= req.params.user,
      projectID=req.params.project,
      projectName=null,
      projectBPM=null,
      projectTonality=null,
      trackArray=[],
      tempo=null,
      timeLength=null;
    
    // Query project data 
    pool.query('SELECT * FROM projects WHERE project_id=$1',[req.params.project], (err, result) => {
        if(err){ console.log("Failed "+ err); }
        projectName= result.rows[0].project_name;
        projectBPM=result.rows[0].tempo;
        projectTonality=result.rows[0].tonality;
        tempo=result.rows[0].tempo;
        timeLength=result.rows[0].timelength;
    })
    
    // Delete empty audio
    pool.query('DELETE FROM tracks WHERE audio IS NULL', (err, result) => {
        if(err){ console.log("Failed "+ err); }
        console.log(result);
    });
    
     // Query track data
    pool.query('SELECT * FROM tracks WHERE project_id=$1 ORDER BY track_id DESC',[req.params.project], (err, result) => {
        if(err){console.log("Failed "+ err);}
        var tracksInfo=result.rows;
        tracksInfo.forEach(function(el){
            trackArray.push(el.audio);
        });
        console.log(trackArray);
        // Render track page and pass data to tracks.ejs.
        setTimeout(function(){
             res.render("tracks",{tracksInfo:tracksInfo,
                                  userID:userID,
                                  projectID:projectID,
                                  projectName:projectName,
                                  projectBPM:projectBPM,
                                  projectTonality:projectTonality,
                                  trackArray:trackArray,
                                  tempo:tempo,
                                  timeLength:timeLength
                                  });
        },1000);
    })
});


/**
 * "POST" request
 * Create a track
 */ 
router.post("/user_:user/projects_:project/tracks",function(req,res){
    var userID=req.params.user,
        projectID= req.params.project;
    
    pool.query("INSERT INTO tracks (project_id,create_date,track_name) VALUES($1,CURRENT_DATE,$2)",
        [projectID,req.body.trackName],(err,result)=>{
            if(err){
                console.log(err);
            }
            
            // When a track is created, the web page will redirect to sequencer page.
            pool.query('SELECT * FROM tracks ORDER BY track_id DESC',(err, result) => {
                if(err){console.log("Failed "+ err);}
                res.redirect('/user_'+userID+'/projects_'+projectID+'/tracks_'+result.rows[0].track_id);
            });
    })
});

/**
 * "Delete" request
 * Delete the track
 */ 
router.delete("/user_:user/projects_:project/tracks_:track",function(req,res){
    pool.query('DELETE FROM tracks WHERE track_id=$1',
        [req.params.track],(err,result)=>{
            if(err){console.log(err);}
            res.send(200);
        })
});

module.exports=router;