/**
 * @author: Yu-Ning, Chang 
 * This file is used to configure routes.
 * 
 * API I use in my code: (license details can be found in "node_modules" package.)
 * =====================
 * "express": "^4.16.3"
 * "body-parser": "^1.18.3"
 * "ejs": "^2.6.1"
 */

var express     = require("express"),
    bodyParser   =require("body-parser");
var app=express();

// Define the root for static files like EJS, CSS, and JavaScript.
app.use(express.static("client"));
// Define view engines to Ejs.
app.set("view engine","ejs");
// Use body parser to get parameters from Ejs files.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//Connect to server
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


// "Other routes" will lead users to error page.
app.get('/*',function(req,res){
    res.render('errorPage')
})