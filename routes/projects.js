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
 * Render the project page 
 */ 
router.get("/user_:user/projects",function(req, res) {
    var userID=req.params.user,
        projectID=req.params.project;
  // query user's all projects     
  pool.query('SELECT * FROM projects WHERE user_id=$1 ORDER BY project_id DESC', [userID],(err, result) => {
        if(err){console.log("Failed "+ err);}
        var projectList=result.rows;
        res.render("projects",{projectList:projectList,userID:userID});
    })
});


/**
 * "POST" request
 *  Create a project with name, tempo, and tonality.
 */ 
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

/**
 * "Delete" request
 *  Delete the project and remove it from the project db.
 */ 
router.delete("/user_:user/projects_:project",function(req,res){
    pool.query('DELETE FROM projects WHERE project_id=$1',
        [req.params.project],(err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(200);
        })
});
    

/**
 * "POST" request
 *  Update the project name.
 */ 
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