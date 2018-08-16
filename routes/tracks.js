var express=require('express'),
    router=express.Router(),
    pool=require('../models/databasePool.js');


// query tracks information from "tracks table" 
router.get("/user_:user/projects_:project/tracks",function(req, res) {
  var userID= req.params.user,
      projectID=req.params.project,
      projectName=null,
      projectBPM=null,
      projectTonality=null,
      trackArray=[],
      tempo=null,
      timeLength=null;
  
    pool.query('SELECT * FROM projects WHERE project_id=$1',[req.params.project], (err, result) => {
    if(err){
        console.log("Failed "+ err);
    }
    projectName= result.rows[0].project_name;
    projectBPM=result.rows[0].tempo;
    projectTonality=result.rows[0].tonality;
    tempo=result.rows[0].tempo;
    timeLength=result.rows[0].timelength;
    })
  
    pool.query('SELECT * FROM tracks WHERE project_id=$1 ORDER BY track_id DESC',[req.params.project], (err, result) => {
    if(err){console.log("Failed "+ err);
    }
    
    result.rows.forEach(function(el){trackArray.push(el.audio)});
    
    //Make sure data are all got from db
    setTimeout(function(){
         res.render("tracks",{tracksInfo:result.rows,
                              userID:userID,
                              projectID:projectID,
                              projectName:projectName,
                              projectBPM:projectBPM,
                              projectTonality:projectTonality,
                              trackArray:trackArray,
                              tempo:tempo,
                              timeLength:timeLength
         });
        //  console.log(timeLength);
    },1000)
   
    })
});




// insert tracks information
router.post("/user_:user/projects_:project/tracks",function(req,res){
    var userID=req.params.user;
    var projectID= req.params.project;
    
    pool.query("INSERT INTO tracks (project_id,create_date,track_name) VALUES($1,CURRENT_DATE,$2)",
        [projectID,req.body.trackName],(err,result)=>{
            if(err){
                console.log(err);
            }
            // res.redirect('/user_'+userID+'/projects_'+projectID+'/tracks');
            pool.query('SELECT * FROM tracks ORDER BY track_id DESC',(err, result) => {
                if(err){console.log("Failed "+ err);}
                        res.redirect('/user_'+userID+'/projects_'+projectID+'/tracks_'+result.rows[0].track_id);
            });
    })
});

// delete tracks **wait for refactoring
router.delete("/user_:user/projects_:project/tracks_:track",function(req,res){
    pool.query('DELETE FROM tracks WHERE track_id=$1',
        [req.params.track],(err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(200);
        })
});

module.exports=router;