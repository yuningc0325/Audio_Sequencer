var express     = require("express"),
    bodyPaser   =require("body-parser");
var app=express();

// read the files through route setting 
app.use(express.static("client"));
// read the ejs without doctype
app.set("view engine","ejs");
// use body parser to get elements from ejs
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:true}));
//connect to server
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server connceted"); 
});

// Index Route
// ==================
var index=require('./routes/index.js');
app.use(index);

// Project Route
// ==================
var projects=require("./routes/projects.js");
app.use(projects);

// Track Route
// ==================
var tracks=require("./routes/tracks.js");
app.use(tracks);

// Sequencer Route
// ==================
var sequencer=require('./routes/sequencer.js');
app.use(sequencer);

app.get('/*',function(req,res){
    res.render('errorPage')
})