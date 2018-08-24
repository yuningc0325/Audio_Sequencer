/**
 * @author: Yu-Ning, Chang 
 * This file is used to save notes of different instruments in different tonalities to MongoDB.
 * 
 * API I use in my code, license details can be found in "node_modules" package.
 * =====================
 * "mongoose": "^5.1.7"
 * # License Copyright (c) 2010 LearnBoost &lt;dev@learnboost.com&gt;
 *
 */
 
var mongoose=require("mongoose");
// mongoDB connection
// mongoose.connect("mongodb://localhost/instrument");
mongoose.connect("mongodb://yuningc0325:Yuyuyu123@ds125322.mlab.com:25322/soundlibrary");


// piano schema
var pianoSchema =new mongoose.Schema({
        name:String,
        notes:[]
    });
    
var Piano = mongoose.model("Piano",pianoSchema);

// Woodwind schema
var woodwindSchema =new mongoose.Schema({
        name:String,
        notes:[]
    });
    
var Woodwind = mongoose.model("Woodwind",woodwindSchema);

// guitar schema
var guitarSchema =new mongoose.Schema({
        name:String,
        notes:[]
    });
    
var Guitar = mongoose.model("Guitar",guitarSchema);

// bass schema
var bassSchema =new mongoose.Schema({
        name:String,
        notes:[]
    });
    
var Bass = mongoose.model("Bass",bassSchema);


// save piano sound
var piano_c= new Piano({
        name:"c",
        notes:[ "/sound/piano/c2.mp3","/sound/piano/d2.mp3","/sound/piano/e2.mp3","/sound/piano/f2.mp3","/sound/piano/g2.mp3","/sound/piano/a2.mp3","/sound/piano/b2.mp3",
                "/sound/piano/c3.mp3","/sound/piano/d3.mp3","/sound/piano/e3.mp3","/sound/piano/f3.mp3","/sound/piano/g3.mp3","/sound/piano/a3.mp3","/sound/piano/b3.mp3",
                "/sound/piano/c4.mp3","/sound/piano/d4.mp3","/sound/piano/e4.mp3","/sound/piano/f4.mp3","/sound/piano/g4.mp3","/sound/piano/a4.mp3","/sound/piano/b4.mp3"]
    })

var piano_d= new Piano({
        name:"d",
        notes:[ "/sound/piano/d2.mp3","/sound/piano/e2.mp3","/sound/piano/sharp_f2.mp3","/sound/piano/g2.mp3","/sound/piano/a2.mp3","/sound/piano/b2.mp3","/sound/piano/sharp_c3.mp3",
                "/sound/piano/d3.mp3","/sound/piano/e3.mp3","/sound/piano/sharp_f3.mp3","/sound/piano/g3.mp3","/sound/piano/a3.mp3","/sound/piano/b3.mp3","/sound/piano/sharp_c4.mp3",
                "/sound/piano/d4.mp3","/sound/piano/e4.mp3","/sound/piano/sharp_f4.mp3","/sound/piano/g4.mp3","/sound/piano/a4.mp3","/sound/piano/b4.mp3","/sound/piano/sharp_c5.mp3"]
    })   
    
var piano_e= new Piano({
        name:"e",
        notes:[ "/sound/piano/e2.mp3","/sound/piano/sharp_f2.mp3","/sound/piano/sharp_g2.mp3","/sound/piano/a2.mp3","/sound/piano/b2.mp3","/sound/piano/sharp_c3.mp3","/sound/piano/sharp_d3.mp3",
                "/sound/piano/e3.mp3","/sound/piano/sharp_f3.mp3","/sound/piano/sharp_g3.mp3","/sound/piano/a3.mp3","/sound/piano/b3.mp3","/sound/piano/sharp_c4.mp3","/sound/piano/sharp_d4.mp3",
                "/sound/piano/e4.mp3","/sound/piano/sharp_f4.mp3","/sound/piano/sharp_g4.mp3","/sound/piano/a4.mp3","/sound/piano/b4.mp3","/sound/piano/sharp_c5.mp3","/sound/piano/sharp_d5.mp3"]
    }) 
    
var piano_f= new Piano({
        name:"f",
        notes:[ "/sound/piano/f2.mp3","/sound/piano/g2.mp3","/sound/piano/a2.mp3","/sound/piano/sharp_a2.mp3","/sound/piano/c3.mp3","/sound/piano/d3.mp3","/sound/piano/e3.mp3",
                "/sound/piano/f3.mp3","/sound/piano/g3.mp3","/sound/piano/a3.mp3","/sound/piano/sharp_a3.mp3","/sound/piano/c4.mp3","/sound/piano/d4.mp3","/sound/piano/e4.mp3",
                "/sound/piano/f4.mp3","/sound/piano/g4.mp3","/sound/piano/a4.mp3","/sound/piano/sharp_a4.mp3","/sound/piano/c5.mp3","/sound/piano/d5.mp3","/sound/piano/e5.mp3"]
    }) 
    
var piano_g= new Piano({
        name:"g",
        notes:[ "/sound/piano/g2.mp3","/sound/piano/a2.mp3","/sound/piano/b2.mp3","/sound/piano/c3.mp3","/sound/piano/d3.mp3","/sound/piano/e3.mp3","/sound/piano/sharp_f3.mp3",
                "/sound/piano/g3.mp3","/sound/piano/a3.mp3","/sound/piano/b3.mp3","/sound/piano/c4.mp3","/sound/piano/d4.mp3","/sound/piano/e4.mp3","/sound/piano/sharp_f4.mp3",
                "/sound/piano/g4.mp3","/sound/piano/a4.mp3","/sound/piano/b4.mp3","/sound/piano/c5.mp3","/sound/piano/d5.mp3","/sound/piano/e5.mp3","/sound/piano/sharp_f5.mp3",]
    }) 
    
var piano_a= new Piano({
        name:"a",
        notes:[ "/sound/piano/a2.mp3","/sound/piano/b2.mp3","/sound/piano/sharp_c3.mp3","/sound/piano/d3.mp3","/sound/piano/e3.mp3","/sound/piano/sharp_f3.mp3","/sound/piano/sharp_g3.mp3",
                "/sound/piano/a3.mp3","/sound/piano/b3.mp3","/sound/piano/sharp_c4.mp3","/sound/piano/d4.mp3","/sound/piano/e4.mp3","/sound/piano/sharp_f4.mp3","/sound/piano/sharp_g4.mp3",
                "/sound/piano/a4.mp3","/sound/piano/b4.mp3","/sound/piano/sharp_c5.mp3","/sound/piano/d5.mp3","/sound/piano/e5.mp3","/sound/piano/sharp_f5.mp3","/sound/piano/sharp_g5.mp3"]
    }) 
    
var piano_b= new Piano({
        name:"b",
        notes:[ "/sound/piano/b2.mp3","/sound/piano/sharp_c3.mp3","/sound/piano/sharp_d3.mp3","/sound/piano/e3.mp3","/sound/piano/sharp_f3.mp3","/sound/piano/sharp_g3.mp3","/sound/piano/sharp_a3.mp3",
                "/sound/piano/b3.mp3","/sound/piano/sharp_c4.mp3","/sound/piano/sharp_d4.mp3","/sound/piano/e4.mp3","/sound/piano/sharp_f4.mp3","/sound/piano/sharp_g4.mp3","/sound/piano/sharp_a4.mp3",
                "/sound/piano/b4.mp3","/sound/piano/sharp_c5.mp3","/sound/piano/sharp_d5.mp3","/sound/piano/e5.mp3","/sound/piano/sharp_f5.mp3","/sound/piano/sharp_g5.mp3","/sound/piano/sharp_a5.mp3"]
    }) 

    
piano_c.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

piano_d.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

piano_e.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

piano_f.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

piano_g.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

piano_a.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

piano_b.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

// save woodwind sound

var woodwind_c= new Woodwind({
        name:"c",
        notes:[ "/sound/woodwind/c2.mp3","/sound/woodwind/d2.mp3","/sound/woodwind/e2.mp3","/sound/woodwind/f2.mp3","/sound/woodwind/g2.mp3","/sound/woodwind/a2.mp3","/sound/woodwind/b2.mp3",
                "/sound/woodwind/c3.mp3","/sound/woodwind/d3.mp3","/sound/woodwind/e3.mp3","/sound/woodwind/f3.mp3","/sound/woodwind/g3.mp3","/sound/woodwind/a3.mp3","/sound/woodwind/b3.mp3",
                "/sound/woodwind/c4.mp3","/sound/woodwind/d4.mp3","/sound/woodwind/e4.mp3","/sound/woodwind/f4.mp3","/sound/woodwind/g4.mp3","/sound/woodwind/a4.mp3","/sound/woodwind/b4.mp3"]
    })

var woodwind_d= new Woodwind({
        name:"d",
        notes:[ "/sound/woodwind/d2.mp3","/sound/woodwind/e2.mp3","/sound/woodwind/sharp_f2.mp3","/sound/woodwind/g2.mp3","/sound/woodwind/a2.mp3","/sound/woodwind/b2.mp3","/sound/woodwind/sharp_c3.mp3",
                "/sound/woodwind/d3.mp3","/sound/woodwind/e3.mp3","/sound/woodwind/sharp_f3.mp3","/sound/woodwind/g3.mp3","/sound/woodwind/a3.mp3","/sound/woodwind/b3.mp3","/sound/woodwind/sharp_c4.mp3",
                "/sound/woodwind/d4.mp3","/sound/woodwind/e4.mp3","/sound/woodwind/sharp_f4.mp3","/sound/woodwind/g4.mp3","/sound/woodwind/a4.mp3","/sound/woodwind/b4.mp3","/sound/woodwind/sharp_c5.mp3"]
    })   
    
var woodwind_e= new Woodwind({
        name:"e",
        notes:[ "/sound/woodwind/e2.mp3","/sound/woodwind/sharp_f2.mp3","/sound/woodwind/sharp_g2.mp3","/sound/woodwind/a2.mp3","/sound/woodwind/b2.mp3","/sound/woodwind/sharp_c3.mp3","/sound/woodwind/sharp_d3.mp3",
                "/sound/woodwind/e3.mp3","/sound/woodwind/sharp_f3.mp3","/sound/woodwind/sharp_g3.mp3","/sound/woodwind/a3.mp3","/sound/woodwind/b3.mp3","/sound/woodwind/sharp_c4.mp3","/sound/woodwind/sharp_d4.mp3",
                "/sound/woodwind/e4.mp3","/sound/woodwind/sharp_f4.mp3","/sound/woodwind/sharp_g4.mp3","/sound/woodwind/a4.mp3","/sound/woodwind/b4.mp3","/sound/woodwind/sharp_c5.mp3","/sound/woodwind/sharp_d5.mp3"]
    }) 
    
var woodwind_f= new Woodwind({
        name:"f",
        notes:[ "/sound/woodwind/f2.mp3","/sound/woodwind/g2.mp3","/sound/woodwind/a2.mp3","/sound/woodwind/sharp_a2.mp3","/sound/woodwind/c3.mp3","/sound/woodwind/d3.mp3","/sound/woodwind/e3.mp3",
                "/sound/woodwind/f3.mp3","/sound/woodwind/g3.mp3","/sound/woodwind/a3.mp3","/sound/woodwind/sharp_a3.mp3","/sound/woodwind/c4.mp3","/sound/woodwind/d4.mp3","/sound/woodwind/e4.mp3",
                "/sound/woodwind/f4.mp3","/sound/woodwind/g4.mp3","/sound/woodwind/a4.mp3","/sound/woodwind/sharp_a4.mp3","/sound/woodwind/c5.mp3","/sound/woodwind/d5.mp3","/sound/woodwind/e5.mp3"]
    }) 
    
var woodwind_g= new Woodwind({
        name:"g",
        notes:[ "/sound/woodwind/g2.mp3","/sound/woodwind/a2.mp3","/sound/woodwind/b2.mp3","/sound/woodwind/c3.mp3","/sound/woodwind/d3.mp3","/sound/woodwind/e3.mp3","/sound/woodwind/sharp_f3.mp3",
                "/sound/woodwind/g3.mp3","/sound/woodwind/a3.mp3","/sound/woodwind/b3.mp3","/sound/woodwind/c4.mp3","/sound/woodwind/d4.mp3","/sound/woodwind/e4.mp3","/sound/woodwind/sharp_f4.mp3",
                "/sound/woodwind/g4.mp3","/sound/woodwind/a4.mp3","/sound/woodwind/b4.mp3","/sound/woodwind/c5.mp3","/sound/woodwind/d5.mp3","/sound/woodwind/e5.mp3","/sound/woodwind/sharp_f5.mp3",]
    }) 
    
var woodwind_a= new Woodwind({
        name:"a",
        notes:[ "/sound/woodwind/a2.mp3","/sound/woodwind/b2.mp3","/sound/woodwind/sharp_c3.mp3","/sound/woodwind/d3.mp3","/sound/woodwind/e3.mp3","/sound/woodwind/sharp_f3.mp3","/sound/woodwind/sharp_g3.mp3",
                "/sound/woodwind/a3.mp3","/sound/woodwind/b3.mp3","/sound/woodwind/sharp_c4.mp3","/sound/woodwind/d4.mp3","/sound/woodwind/e4.mp3","/sound/woodwind/sharp_f4.mp3","/sound/woodwind/sharp_g4.mp3",
                "/sound/woodwind/a4.mp3","/sound/woodwind/b4.mp3","/sound/woodwind/sharp_c5.mp3","/sound/woodwind/d5.mp3","/sound/woodwind/e5.mp3","/sound/woodwind/sharp_f5.mp3","/sound/woodwind/sharp_g5.mp3"]
    }) 
    
var woodwind_b= new Woodwind({
        name:"b",
        notes:[ "/sound/woodwind/b2.mp3","/sound/woodwind/sharp_c3.mp3","/sound/woodwind/sharp_d3.mp3","/sound/woodwind/e3.mp3","/sound/woodwind/sharp_f3.mp3","/sound/woodwind/sharp_g3.mp3","/sound/woodwind/sharp_a3.mp3",
                "/sound/woodwind/b3.mp3","/sound/woodwind/sharp_c4.mp3","/sound/woodwind/sharp_d4.mp3","/sound/woodwind/e4.mp3","/sound/woodwind/sharp_f4.mp3","/sound/woodwind/sharp_g4.mp3","/sound/woodwind/sharp_a4.mp3",
                "/sound/woodwind/b4.mp3","/sound/woodwind/sharp_c5.mp3","/sound/woodwind/sharp_d5.mp3","/sound/woodwind/e5.mp3","/sound/woodwind/sharp_f5.mp3","/sound/woodwind/sharp_g5.mp3","/sound/woodwind/sharp_a5.mp3"]
    }) 

woodwind_c.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

woodwind_d.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

woodwind_e.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

woodwind_f.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

woodwind_g.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

woodwind_a.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

woodwind_b.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})


// save guitar sound 
var guitar_c= new Guitar({
        name:"c",
        notes:[ "/sound/guitar/c2.mp3","/sound/guitar/d2.mp3","/sound/guitar/e2.mp3","/sound/guitar/f2.mp3","/sound/guitar/g2.mp3","/sound/guitar/a2.mp3","/sound/guitar/b2.mp3",
                "/sound/guitar/c3.mp3","/sound/guitar/d3.mp3","/sound/guitar/e3.mp3","/sound/guitar/f3.mp3","/sound/guitar/g3.mp3","/sound/guitar/a3.mp3","/sound/guitar/b3.mp3",
                "/sound/guitar/c4.mp3","/sound/guitar/d4.mp3","/sound/guitar/e4.mp3","/sound/guitar/f4.mp3","/sound/guitar/g4.mp3","/sound/guitar/a4.mp3","/sound/guitar/b4.mp3"]
    })

var guitar_d= new Guitar({
        name:"d",
        notes:[ "/sound/guitar/d2.mp3","/sound/guitar/e2.mp3","/sound/guitar/sharp_f2.mp3","/sound/guitar/g2.mp3","/sound/guitar/a2.mp3","/sound/guitar/b2.mp3","/sound/guitar/sharp_c3.mp3",
                "/sound/guitar/d3.mp3","/sound/guitar/e3.mp3","/sound/guitar/sharp_f3.mp3","/sound/guitar/g3.mp3","/sound/guitar/a3.mp3","/sound/guitar/b3.mp3","/sound/guitar/sharp_c4.mp3",
                "/sound/guitar/d4.mp3","/sound/guitar/e4.mp3","/sound/guitar/sharp_f4.mp3","/sound/guitar/g4.mp3","/sound/guitar/a4.mp3","/sound/guitar/b4.mp3","/sound/guitar/sharp_c5.mp3"]
    })   
    
var guitar_e= new Guitar({
        name:"e",
        notes:[ "/sound/guitar/e2.mp3","/sound/guitar/sharp_f2.mp3","/sound/guitar/sharp_g2.mp3","/sound/guitar/a2.mp3","/sound/guitar/b2.mp3","/sound/guitar/sharp_c3.mp3","/sound/guitar/sharp_d3.mp3",
                "/sound/guitar/e3.mp3","/sound/guitar/sharp_f3.mp3","/sound/guitar/sharp_g3.mp3","/sound/guitar/a3.mp3","/sound/guitar/b3.mp3","/sound/guitar/sharp_c4.mp3","/sound/guitar/sharp_d4.mp3",
                "/sound/guitar/e4.mp3","/sound/guitar/sharp_f4.mp3","/sound/guitar/sharp_g4.mp3","/sound/guitar/a4.mp3","/sound/guitar/b4.mp3","/sound/guitar/sharp_c5.mp3","/sound/guitar/sharp_d5.mp3"]
    }) 
    
var guitar_f= new Guitar({
        name:"f",
        notes:[ "/sound/guitar/f2.mp3","/sound/guitar/g2.mp3","/sound/guitar/a2.mp3","/sound/guitar/sharp_a2.mp3","/sound/guitar/c3.mp3","/sound/guitar/d3.mp3","/sound/guitar/e3.mp3",
                "/sound/guitar/f3.mp3","/sound/guitar/g3.mp3","/sound/guitar/a3.mp3","/sound/guitar/sharp_a3.mp3","/sound/guitar/c4.mp3","/sound/guitar/d4.mp3","/sound/guitar/e4.mp3",
                "/sound/guitar/f4.mp3","/sound/guitar/g4.mp3","/sound/guitar/a4.mp3","/sound/guitar/sharp_a4.mp3","/sound/guitar/c5.mp3","/sound/guitar/d5.mp3","/sound/guitar/e5.mp3"]
    }) 
    
var guitar_g= new Guitar({
        name:"g",
        notes:[ "/sound/guitar/g1.mp3","/sound/guitar/a1.mp3","/sound/guitar/b1.mp3","/sound/guitar/c2.mp3","/sound/guitar/d2.mp3","/sound/guitar/e2.mp3","/sound/guitar/sharp_f2.mp3",
                "/sound/guitar/g2.mp3","/sound/guitar/a2.mp3","/sound/guitar/b2.mp3","/sound/guitar/c3.mp3","/sound/guitar/d3.mp3","/sound/guitar/e3.mp3","/sound/guitar/sharp_f3.mp3",
                "/sound/guitar/g3.mp3","/sound/guitar/a3.mp3","/sound/guitar/b3.mp3","/sound/guitar/c4.mp3","/sound/guitar/d4.mp3","/sound/guitar/e4.mp3","/sound/guitar/sharp_f4.mp3",]
    }) 
    
var guitar_a= new Guitar({
        name:"a",
        notes:[ "/sound/guitar/a1.mp3","/sound/guitar/b1.mp3","/sound/guitar/sharp_c2.mp3","/sound/guitar/d2.mp3","/sound/guitar/e2.mp3","/sound/guitar/sharp_f2.mp3","/sound/guitar/sharp_g2.mp3",
                "/sound/guitar/a2.mp3","/sound/guitar/b2.mp3","/sound/guitar/sharp_c3.mp3","/sound/guitar/d3.mp3","/sound/guitar/e3.mp3","/sound/guitar/sharp_f3.mp3","/sound/guitar/sharp_g3.mp3",
                "/sound/guitar/a3.mp3","/sound/guitar/b3.mp3","/sound/guitar/sharp_c4.mp3","/sound/guitar/d4.mp3","/sound/guitar/e4.mp3","/sound/guitar/sharp_f4.mp3","/sound/guitar/sharp_g4.mp3"]
    }) 
    
var guitar_b= new Guitar({
        name:"b",
        notes:[ "/sound/guitar/b1.mp3","/sound/guitar/sharp_c2.mp3","/sound/guitar/sharp_d2.mp3","/sound/guitar/e2.mp3","/sound/guitar/sharp_f2.mp3","/sound/guitar/sharp_g2.mp3","/sound/guitar/sharp_a2.mp3",
                "/sound/guitar/b2.mp3","/sound/guitar/sharp_c3.mp3","/sound/guitar/sharp_d3.mp3","/sound/guitar/e3.mp3","/sound/guitar/sharp_f3.mp3","/sound/guitar/sharp_g3.mp3","/sound/guitar/sharp_a3.mp3",
                "/sound/guitar/b3.mp3","/sound/guitar/sharp_c4.mp3","/sound/guitar/sharp_d4.mp3","/sound/guitar/e4.mp3","/sound/guitar/sharp_f4.mp3","/sound/guitar/sharp_g4.mp3","/sound/guitar/sharp_a4.mp3"]
    }) 

    
guitar_c.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

guitar_d.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

guitar_e.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

guitar_f.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

guitar_g.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

guitar_a.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

guitar_b.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

// save bass sound 
var bass_c= new Bass({
        name:"c",
        notes:[ "/sound/bass/c2.mp3","/sound/bass/d2.mp3","/sound/bass/e2.mp3","/sound/bass/f2.mp3","/sound/bass/g2.mp3","/sound/bass/a2.mp3","/sound/bass/b2.mp3",
                "/sound/bass/c3.mp3","/sound/bass/d3.mp3","/sound/bass/e3.mp3","/sound/bass/f3.mp3","/sound/bass/g3.mp3","/sound/bass/a3.mp3","/sound/bass/b3.mp3",
                "/sound/bass/c4.mp3","/sound/bass/d4.mp3","/sound/bass/e4.mp3","/sound/bass/f4.mp3","/sound/bass/g4.mp3","/sound/bass/a4.mp3","/sound/bass/b4.mp3"]
    })

var bass_d= new Bass({
        name:"d",
        notes:[ "/sound/bass/d2.mp3","/sound/bass/e2.mp3","/sound/bass/sharp_f2.mp3","/sound/bass/g2.mp3","/sound/bass/a2.mp3","/sound/bass/b2.mp3","/sound/bass/sharp_c3.mp3",
                "/sound/bass/d3.mp3","/sound/bass/e3.mp3","/sound/bass/sharp_f3.mp3","/sound/bass/g3.mp3","/sound/bass/a3.mp3","/sound/bass/b3.mp3","/sound/bass/sharp_c4.mp3",
                "/sound/bass/d4.mp3","/sound/bass/e4.mp3","/sound/bass/sharp_f4.mp3","/sound/bass/g4.mp3","/sound/bass/a4.mp3","/sound/bass/b4.mp3","/sound/bass/sharp_c5.mp3"]
    })   
    
var bass_e= new Bass({
        name:"e",
        notes:[ "/sound/bass/e2.mp3","/sound/bass/sharp_f2.mp3","/sound/bass/sharp_g2.mp3","/sound/bass/a2.mp3","/sound/bass/b2.mp3","/sound/bass/sharp_c3.mp3","/sound/bass/sharp_d3.mp3",
                "/sound/bass/e3.mp3","/sound/bass/sharp_f3.mp3","/sound/bass/sharp_g3.mp3","/sound/bass/a3.mp3","/sound/bass/b3.mp3","/sound/bass/sharp_c4.mp3","/sound/bass/sharp_d4.mp3",
                "/sound/bass/e4.mp3","/sound/bass/sharp_f4.mp3","/sound/bass/sharp_g4.mp3","/sound/bass/a4.mp3","/sound/bass/b4.mp3","/sound/bass/sharp_c5.mp3","/sound/bass/sharp_d5.mp3"]
    }) 
    
var bass_f= new Bass({
        name:"f",
        notes:[ "/sound/bass/f2.mp3","/sound/bass/g2.mp3","/sound/bass/a2.mp3","/sound/bass/sharp_a2.mp3","/sound/bass/c3.mp3","/sound/bass/d3.mp3","/sound/bass/e3.mp3",
                "/sound/bass/f3.mp3","/sound/bass/g3.mp3","/sound/bass/a3.mp3","/sound/bass/sharp_a3.mp3","/sound/bass/c4.mp3","/sound/bass/d4.mp3","/sound/bass/e4.mp3",
                "/sound/bass/f4.mp3","/sound/bass/g4.mp3","/sound/bass/a4.mp3","/sound/bass/sharp_a4.mp3","/sound/bass/c5.mp3","/sound/bass/d5.mp3","/sound/bass/e5.mp3"]
    }) 
    
var bass_g= new Bass({
        name:"g",
        notes:[ "/sound/bass/g1.mp3","/sound/bass/a1.mp3","/sound/bass/b1.mp3","/sound/bass/c2.mp3","/sound/bass/d2.mp3","/sound/bass/e2.mp3","/sound/bass/sharp_f2.mp3",
                "/sound/bass/g2.mp3","/sound/bass/a2.mp3","/sound/bass/b2.mp3","/sound/bass/c3.mp3","/sound/bass/d3.mp3","/sound/bass/e3.mp3","/sound/bass/sharp_f3.mp3",
                "/sound/bass/g3.mp3","/sound/bass/a3.mp3","/sound/bass/b3.mp3","/sound/bass/c4.mp3","/sound/bass/d4.mp3","/sound/bass/e4.mp3","/sound/bass/sharp_f4.mp3",]
    }) 
    
var bass_a= new Bass({
        name:"a",
        notes:[ "/sound/bass/a1.mp3","/sound/bass/b1.mp3","/sound/bass/sharp_c2.mp3","/sound/bass/d2.mp3","/sound/bass/e2.mp3","/sound/bass/sharp_f2.mp3","/sound/bass/sharp_g2.mp3",
                "/sound/bass/a2.mp3","/sound/bass/b2.mp3","/sound/bass/sharp_c3.mp3","/sound/bass/d3.mp3","/sound/bass/e3.mp3","/sound/bass/sharp_f3.mp3","/sound/bass/sharp_g3.mp3",
                "/sound/bass/a3.mp3","/sound/bass/b3.mp3","/sound/bass/sharp_c4.mp3","/sound/bass/d4.mp3","/sound/bass/e4.mp3","/sound/bass/sharp_f4.mp3","/sound/bass/sharp_g4.mp3"]
    }) 
    
var bass_b= new Bass({
        name:"b",
        notes:[ "/sound/bass/b1.mp3","/sound/bass/sharp_c2.mp3","/sound/bass/sharp_d2.mp3","/sound/bass/e2.mp3","/sound/bass/sharp_f2.mp3","/sound/bass/sharp_g2.mp3","/sound/bass/sharp_a2.mp3",
                "/sound/bass/b2.mp3","/sound/bass/sharp_c3.mp3","/sound/bass/sharp_d3.mp3","/sound/bass/e3.mp3","/sound/bass/sharp_f3.mp3","/sound/bass/sharp_g3.mp3","/sound/bass/sharp_a3.mp3",
                "/sound/bass/b3.mp3","/sound/bass/sharp_c4.mp3","/sound/bass/sharp_d4.mp3","/sound/bass/e4.mp3","/sound/bass/sharp_f4.mp3","/sound/bass/sharp_g4.mp3","/sound/bass/sharp_a4.mp3"]
    }) 

    
bass_c.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

bass_d.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

bass_e.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

bass_f.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

bass_g.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

bass_a.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

bass_b.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})