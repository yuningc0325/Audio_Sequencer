// this file is used for saving notes of different instruments in different tonalities.

var mongoose=require("mongoose");
// mongoDB connection
mongoose.connect("mongodb://localhost/instrument");


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

// strings schema
var stringsSchema =new mongoose.Schema({
        name:String,
        notes:[]
    });
    
var Strings = mongoose.model("Strings",stringsSchema);

// synth schema
var synthSchema =new mongoose.Schema({
        name:String,
        notes:[]
    });
    
var Synth = mongoose.model("Synth",synthSchema);


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


// save strings sound 
var strings_c= new Strings({
        name:"c",
        notes:[ "/sound/strings/c2.mp3","/sound/strings/d2.mp3","/sound/strings/e2.mp3","/sound/strings/f2.mp3","/sound/strings/g2.mp3","/sound/strings/a2.mp3","/sound/strings/b2.mp3",
                "/sound/strings/c3.mp3","/sound/strings/d3.mp3","/sound/strings/e3.mp3","/sound/strings/f3.mp3","/sound/strings/g3.mp3","/sound/strings/a3.mp3","/sound/strings/b3.mp3",
                "/sound/strings/c4.mp3","/sound/strings/d4.mp3","/sound/strings/e4.mp3","/sound/strings/f4.mp3","/sound/strings/g4.mp3","/sound/strings/a4.mp3","/sound/strings/b4.mp3"]
    })

var strings_d= new Strings({
        name:"d",
        notes:[ "/sound/strings/d2.mp3","/sound/strings/e2.mp3","/sound/strings/sharp_f2.mp3","/sound/strings/g2.mp3","/sound/strings/a2.mp3","/sound/strings/b2.mp3","/sound/strings/sharp_c3.mp3",
                "/sound/strings/d3.mp3","/sound/strings/e3.mp3","/sound/strings/sharp_f3.mp3","/sound/strings/g3.mp3","/sound/strings/a3.mp3","/sound/strings/b3.mp3","/sound/strings/sharp_c4.mp3",
                "/sound/strings/d4.mp3","/sound/strings/e4.mp3","/sound/strings/sharp_f4.mp3","/sound/strings/g4.mp3","/sound/strings/a4.mp3","/sound/strings/b4.mp3","/sound/strings/sharp_c5.mp3"]
    })   
    
var strings_e= new Strings({
        name:"e",
        notes:[ "/sound/strings/e2.mp3","/sound/strings/sharp_f2.mp3","/sound/strings/sharp_g2.mp3","/sound/strings/a2.mp3","/sound/strings/b2.mp3","/sound/strings/sharp_c3.mp3","/sound/strings/sharp_d3.mp3",
                "/sound/strings/e3.mp3","/sound/strings/sharp_f3.mp3","/sound/strings/sharp_g3.mp3","/sound/strings/a3.mp3","/sound/strings/b3.mp3","/sound/strings/sharp_c4.mp3","/sound/strings/sharp_d4.mp3",
                "/sound/strings/e4.mp3","/sound/strings/sharp_f4.mp3","/sound/strings/sharp_g4.mp3","/sound/strings/a4.mp3","/sound/strings/b4.mp3","/sound/strings/sharp_c5.mp3","/sound/strings/sharp_d5.mp3"]
    }) 
    
var strings_f= new Strings({
        name:"f",
        notes:[ "/sound/strings/f2.mp3","/sound/strings/g2.mp3","/sound/strings/a2.mp3","/sound/strings/sharp_a2.mp3","/sound/strings/c3.mp3","/sound/strings/d3.mp3","/sound/strings/e3.mp3",
                "/sound/strings/f3.mp3","/sound/strings/g3.mp3","/sound/strings/a3.mp3","/sound/strings/sharp_a3.mp3","/sound/strings/c4.mp3","/sound/strings/d4.mp3","/sound/strings/e4.mp3",
                "/sound/strings/f4.mp3","/sound/strings/g4.mp3","/sound/strings/a4.mp3","/sound/strings/sharp_a4.mp3","/sound/strings/c5.mp3","/sound/strings/d5.mp3","/sound/strings/e5.mp3"]
    }) 
    
var strings_g= new Strings({
        name:"g",
        notes:[ "/sound/strings/g2.mp3","/sound/strings/a2.mp3","/sound/strings/b2.mp3","/sound/strings/c3.mp3","/sound/strings/d3.mp3","/sound/strings/e3.mp3","/sound/strings/sharp_f3.mp3",
                "/sound/strings/g3.mp3","/sound/strings/a3.mp3","/sound/strings/b3.mp3","/sound/strings/c4.mp3","/sound/strings/d4.mp3","/sound/strings/e4.mp3","/sound/strings/sharp_f4.mp3",
                "/sound/strings/g4.mp3","/sound/strings/a4.mp3","/sound/strings/b4.mp3","/sound/strings/c5.mp3","/sound/strings/d5.mp3","/sound/strings/e5.mp3","/sound/strings/sharp_f5.mp3",]
    }) 
    
var strings_a= new Strings({
        name:"a",
        notes:[ "/sound/strings/a2.mp3","/sound/strings/b2.mp3","/sound/strings/sharp_c3.mp3","/sound/strings/d3.mp3","/sound/strings/e3.mp3","/sound/strings/sharp_f3.mp3","/sound/strings/sharp_g3.mp3",
                "/sound/strings/a3.mp3","/sound/strings/b3.mp3","/sound/strings/sharp_c4.mp3","/sound/strings/d4.mp3","/sound/strings/e4.mp3","/sound/strings/sharp_f4.mp3","/sound/strings/sharp_g4.mp3",
                "/sound/strings/a4.mp3","/sound/strings/b4.mp3","/sound/strings/sharp_c5.mp3","/sound/strings/d5.mp3","/sound/strings/e5.mp3","/sound/strings/sharp_f5.mp3","/sound/strings/sharp_g5.mp3"]
    }) 
    
var strings_b= new Strings({
        name:"b",
        notes:[ "/sound/strings/b2.mp3","/sound/strings/sharp_c3.mp3","/sound/strings/sharp_d3.mp3","/sound/strings/e3.mp3","/sound/strings/sharp_f3.mp3","/sound/strings/sharp_g3.mp3","/sound/strings/sharp_a3.mp3",
                "/sound/strings/b3.mp3","/sound/strings/sharp_c4.mp3","/sound/strings/sharp_d4.mp3","/sound/strings/e4.mp3","/sound/strings/sharp_f4.mp3","/sound/strings/sharp_g4.mp3","/sound/strings/sharp_a4.mp3",
                "/sound/strings/b4.mp3","/sound/strings/sharp_c5.mp3","/sound/strings/sharp_d5.mp3","/sound/strings/e5.mp3","/sound/strings/sharp_f5.mp3","/sound/strings/sharp_g5.mp3","/sound/strings/sharp_a5.mp3"]
    }) 






    
strings_c.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

strings_d.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

strings_e.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

strings_f.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

strings_g.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

strings_a.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

strings_b.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

// save synth sound 
var synth_c= new Synth({
        name:"c",
        notes:[ "/sound/synth/c2.mp3","/sound/synth/d2.mp3","/sound/synth/e2.mp3","/sound/synth/f2.mp3","/sound/synth/g2.mp3","/sound/synth/a2.mp3","/sound/synth/b2.mp3",
                "/sound/synth/c3.mp3","/sound/synth/d3.mp3","/sound/synth/e3.mp3","/sound/synth/f3.mp3","/sound/synth/g3.mp3","/sound/synth/a3.mp3","/sound/synth/b3.mp3",
                "/sound/synth/c4.mp3","/sound/synth/d4.mp3","/sound/synth/e4.mp3","/sound/synth/f4.mp3","/sound/synth/g4.mp3","/sound/synth/a4.mp3","/sound/synth/b4.mp3"]
    })

var synth_d= new Synth({
        name:"d",
        notes:[ "/sound/synth/d2.mp3","/sound/synth/e2.mp3","/sound/synth/sharp_f2.mp3","/sound/synth/g2.mp3","/sound/synth/a2.mp3","/sound/synth/b2.mp3","/sound/synth/sharp_c3.mp3",
                "/sound/synth/d3.mp3","/sound/synth/e3.mp3","/sound/synth/sharp_f3.mp3","/sound/synth/g3.mp3","/sound/synth/a3.mp3","/sound/synth/b3.mp3","/sound/synth/sharp_c4.mp3",
                "/sound/synth/d4.mp3","/sound/synth/e4.mp3","/sound/synth/sharp_f4.mp3","/sound/synth/g4.mp3","/sound/synth/a4.mp3","/sound/synth/b4.mp3","/sound/synth/sharp_c5.mp3"]
    })   
    
var synth_e= new Synth({
        name:"e",
        notes:[ "/sound/synth/e2.mp3","/sound/synth/sharp_f2.mp3","/sound/synth/sharp_g2.mp3","/sound/synth/a2.mp3","/sound/synth/b2.mp3","/sound/synth/sharp_c3.mp3","/sound/synth/sharp_d3.mp3",
                "/sound/synth/e3.mp3","/sound/synth/sharp_f3.mp3","/sound/synth/sharp_g3.mp3","/sound/synth/a3.mp3","/sound/synth/b3.mp3","/sound/synth/sharp_c4.mp3","/sound/synth/sharp_d4.mp3",
                "/sound/synth/e4.mp3","/sound/synth/sharp_f4.mp3","/sound/synth/sharp_g4.mp3","/sound/synth/a4.mp3","/sound/synth/b4.mp3","/sound/synth/sharp_c5.mp3","/sound/synth/sharp_d5.mp3"]
    }) 
    
var synth_f= new Synth({
        name:"f",
        notes:[ "/sound/synth/f2.mp3","/sound/synth/g2.mp3","/sound/synth/a2.mp3","/sound/synth/sharp_a2.mp3","/sound/synth/c3.mp3","/sound/synth/d3.mp3","/sound/synth/e3.mp3",
                "/sound/synth/f3.mp3","/sound/synth/g3.mp3","/sound/synth/a3.mp3","/sound/synth/sharp_a3.mp3","/sound/synth/c4.mp3","/sound/synth/d4.mp3","/sound/synth/e4.mp3",
                "/sound/synth/f4.mp3","/sound/synth/g4.mp3","/sound/synth/a4.mp3","/sound/synth/sharp_a4.mp3","/sound/synth/c5.mp3","/sound/synth/d5.mp3","/sound/synth/e5.mp3"]
    }) 
    
var synth_g= new Synth({
        name:"g",
        notes:[ "/sound/synth/g2.mp3","/sound/synth/a2.mp3","/sound/synth/b2.mp3","/sound/synth/c3.mp3","/sound/synth/d3.mp3","/sound/synth/e3.mp3","/sound/synth/sharp_f3.mp3",
                "/sound/synth/g3.mp3","/sound/synth/a3.mp3","/sound/synth/b3.mp3","/sound/synth/c4.mp3","/sound/synth/d4.mp3","/sound/synth/e4.mp3","/sound/synth/sharp_f4.mp3",
                "/sound/synth/g4.mp3","/sound/synth/a4.mp3","/sound/synth/b4.mp3","/sound/synth/c5.mp3","/sound/synth/d5.mp3","/sound/synth/e5.mp3","/sound/synth/sharp_f5.mp3",]
    }) 
    
var synth_a= new Synth({
        name:"a",
        notes:[ "/sound/synth/a2.mp3","/sound/synth/b2.mp3","/sound/synth/sharp_c3.mp3","/sound/synth/d3.mp3","/sound/synth/e3.mp3","/sound/synth/sharp_f3.mp3","/sound/synth/sharp_g3.mp3",
                "/sound/synth/a3.mp3","/sound/synth/b3.mp3","/sound/synth/sharp_c4.mp3","/sound/synth/d4.mp3","/sound/synth/e4.mp3","/sound/synth/sharp_f4.mp3","/sound/synth/sharp_g4.mp3",
                "/sound/synth/a4.mp3","/sound/synth/b4.mp3","/sound/synth/sharp_c5.mp3","/sound/synth/d5.mp3","/sound/synth/e5.mp3","/sound/synth/sharp_f5.mp3","/sound/synth/sharp_g5.mp3"]
    }) 
    
var synth_b= new Synth({
        name:"b",
        notes:[ "/sound/synth/b2.mp3","/sound/synth/sharp_c3.mp3","/sound/synth/sharp_d3.mp3","/sound/synth/e3.mp3","/sound/synth/sharp_f3.mp3","/sound/synth/sharp_g3.mp3","/sound/synth/sharp_a3.mp3",
                "/sound/synth/b3.mp3","/sound/synth/sharp_c4.mp3","/sound/synth/sharp_d4.mp3","/sound/synth/e4.mp3","/sound/synth/sharp_f4.mp3","/sound/synth/sharp_g4.mp3","/sound/synth/sharp_a4.mp3",
                "/sound/synth/b4.mp3","/sound/synth/sharp_c5.mp3","/sound/synth/sharp_d5.mp3","/sound/synth/e5.mp3","/sound/synth/sharp_f5.mp3","/sound/synth/sharp_g5.mp3","/sound/synth/sharp_a5.mp3"]
    }) 

    
synth_c.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

synth_d.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

synth_e.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

synth_f.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

synth_g.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

synth_a.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})

synth_b.save(function(err,res){
    if(err){console.log(err)}
    console.log(res);
})