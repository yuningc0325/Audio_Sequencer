var express     = require("express"),
    bodyPaser   =require("body-parser"),
    mongoose    =require("mongoose"),
    multer      =require("multer");
const { Pool } = require('pg');

var app=express();
// configure psql pool
const pool = new Pool({
  user: 'ubuntu',
  host: 'localhost',
  database: 'finalProject',
  password: 'Yuyuyu123',
});


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


// read the files through route setting 
app.use(express.static("client"));
// read the ejs without doctype
app.set("view engine","ejs");
// use body parser to get elements from ejs
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:true}));

// mongoDB connection
mongoose.connect("mongodb://localhost/instrument");


// mongoose schema and model
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




//connect to server
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server connceted"); 
});

app.get('/demo/log_in',function(req, res) {
    res.render('demoLogin',{accountCheck:true});
});

app.post('/demo/log_in',function(req,res){
    pool.query('SELECT COUNT (user_id) FROM member WHERE account=$1',[req.body.account],(err,result)=>{
       if(err){console.log(err)}
       // if the account does exist
       if(result.rows[0].count!=0){
           pool.query('SELECT * FROM member WHERE account=$1',[req.body.account],(err,result)=>{
               if(err){console.log(err)}
               res.redirect('/user_'+result.rows[0].user_id+'/projects');
           })
       }else{
           console.log("account does not exist");
           res.render('demoLogin',{accountCheck:false});
       }
    }
    );
});

// query projects information from "porjects table" 
app.get("/user_:user/projects",function(req, res) {
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
app.post("/user_:user/projects",function(req,res){
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
app.delete("/user_:user/projects_:project",function(req,res){
    pool.query('DELETE FROM projects WHERE project_id=$1',
        [req.params.project],(err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(200);
        })
});
    
// edit project name
app.post("/user_:user/projects_:project",function(req,res){
    var userID=req.params.user;
    var projectID=req.params.project;
    pool.query('UPDATE projects SET project_name=$1 WHERE project_id=$2',[req.body.newProjectName,projectID],(err,result)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/user_'+userID+'/projects');
    });
});


// query tracks information from "tracks table" 
app.get("/user_:user/projects_:project/tracks",function(req, res) {
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
         console.log(timeLength);
    },1000)
   
    })
});




// insert tracks information
app.post("/user_:user/projects_:project/tracks",function(req,res){
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
app.delete("/user_:user/projects_:project/tracks_:track",function(req,res){
    pool.query('DELETE FROM tracks WHERE track_id=$1',
        [req.params.track],(err,result)=>{
            if(err){
                console.log(err);
            }
            res.send(200);
        })
});
    


app.get("/user_:user/projects_:project/tracks_:track",function(req, res) {
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
app.put("/user_:user/projects_:project/tracks_:track",uploadType,function(req,res,next){
    // var userID      =req.params.user,
    //     projectID   =req.params.project,
    var trimAudioUrl=req.file.path.replace('client',"");
    pool.query('UPDATE tracks SET audio=$1 WHERE track_id=$2',[trimAudioUrl,req.params.track],(err,result)=>{
        if(err){console.log(err);}
        // console.log(trimAudioUrl);
        res.send(200);
    })
});

app.get('*',function(req,res){
    res.render('errorPage')
    
})


// test port
app.get('/:id/test',function(req,res){
    var trackID=req.params.id;
    pool.query('SELECT * FROM tracks WHERE track_id=$1',[trackID], (err, result) => {
    if(err){console.log(err);}
    
    
    // audio=result.rows[0].audio;
    res.render('dbtest',{audioUrl:result.rows[0].audio})
    }); 
    
})


// The route below is used for outside user

    //member sign up,  store data to member table,** don't know how to let user know they can't sign up
    // app.get('/user/sign_up',function(req, res) {
    //     res.render('signup');
    // });
    
    // app.post('/user/sign_up',function(req, res) { 
    //     pool.query('SELECT COUNT (user_id) FROM member WHERE account=$1',
    //         [req.body.account],(err,queryResult)=>{
    //                 if(err){console.log(err);}
    //                 if(queryResult.rows[0].count!=0){
    //                   console.log("the account has exsited");
    //                 }else{
                        
    //                     pool.query('INSERT INTO member(join_date,account,password,username) VALUES(CURRENT_DATE,$1,$2,$3)',
    //                                  [req.body.account,req.body.password,req.body.userName],(err,result)=>{
    //                                     if(err){ console.log(err);}
    //                                     res.redirect('/user/log_in');
    //                                  });
    //                 }
    //         });
    // });
      
    // user log in and authentication 
    // app.get('/user/log_in',function(req, res) {
    //     res.render('login');
    // });
    
    // app.post('/user/log_in',function(req,res){
    //     // if the account exist or passowrd is  correct
    //     pool.query('SELECT COUNT (user_id) FROM member WHERE account=$1',[req.body.account],(err,accountCheck)=>{
    //       if(err){console.log(err)}
    //       // if the account does exist
    //       if(accountCheck.rows[0].count!=0){
    //           pool.query('SELECT * FROM member WHERE account=$1',[req.body.account],(err,passwordCheck)=>{
    //               if(err){console.log(err)}
    //               var password=req.body.password;
    //               // if password is correct
    //               if(passwordCheck.rows[0].password==password){
    //                   res.redirect('/user_'+passwordCheck.rows[0].user_id+'/projects');
    //               }else{
    //                   console.log("password is not correct");
    //               }
    //           })
    //       }else{
    //           console.log("account does not exist");
    //       }
    //     }
    //     );
    // });
    
    // query user details
    // app.get('/user_:user/setting',function(req,res){
    //     var userID=req.params.user;
    //     pool.query('SELECT * FROM member WHERE user_id=$1',[userID],(err, result) => {
            
    //     if(err){console.log("Failed "+ err);}
        
    //     res.render('setting',{userID:userID,userDetails:result.rows[0]});
    //     // pool.end();
    //     })
    // })
    
    // update user's details
    // app.post('/user_:user/setting',function(req,res){
    //      var userID=req.params.user; 
    //      var oldPassword=req.body.oldPassword;
         
    //      pool.query('SELECT password FROM member WHERE user_id=$1',[userID],(err,queryResult)=>{
    //          if(err){console.log("Failed "+ err)}
    //          // if old password is correct
    //          if(queryResult.rows[0].password==oldPassword){
    //               pool.query('UPDATE member SET password=$1 WHERE user_id=$2',[req.body.newPassword,userID],(err, result) => {
    //                  if(err){console.log("Failed "+ err)}
    
    //                  res.redirect('/user_'+userID+'/setting');
    //                 // pool.end();
    //                 })
    //          }else{
    //              console.log("password wrong");
    //          }
    //      })
    // })