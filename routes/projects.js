var express=require('express'),
    router=express.Router(),
    pool=require('../models/databasePool.js');


// query projects information from "porjects table" 
router.get("/user_:user/projects",function(req, res) {
    var userID=req.params.user;
    var projectID=req.params.project;
  // query user's all projects     
  pool.query('SELECT * FROM projects WHERE user_id=$1', [userID],(err, result) => {
        if(err){console.log("Failed "+ err);}
        var projectList=result.rows;
        res.render("projects",{projectList:projectList,userID:userID});
        // pool.end();
    })
});


// insert projects information( tempo,tonality,name) into "projects table"
router.post("/user_:user/projects",function(req,res){
        var userID=req.params.user;
        var projectName=req.body.projectName;
        var tonality=req.body.tonality;
        var tempo=req.body.tempo;
        var length=60/tempo*16;
        pool.query('INSERT INTO projects(user_id,create_date,project_name,tonality,tempo,timeLength) VALUES($1,CURRENT_DATE,$2,$3,$4,$5)',
        [userID,projectName,tonality,tempo,length],(err,result)=>{
            if(err){
                console.log(err);
            }
            res.redirect('/user_'+userID+'/projects');
        })
    });

// delete projects **wait for refactoring
router.delete("/user_:user/projects_:project",function(req,res){
    pool.query('DELETE FROM projects WHERE project_id=$1',
        [req.params.project],(err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(200);
        })
});
    
// edit project name
router.post("/user_:user/projects_:project",function(req,res){
    var userID=req.params.user;
    var projectID=req.params.project;
    pool.query('UPDATE projects SET project_name=$1 WHERE project_id=$2',[req.body.newProjectName,projectID],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/user_'+userID+'/projects');
    });
});

module.exports=router;