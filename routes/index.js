
var express=require('express');
var router=express.Router();


// Index Route
// ==================

router.get('/demo/log_in',function(req, res) {
    res.render('demoLogin',{accountCheck:true});
});

router.post('/demo/log_in',function(req,res){
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


module.exports=router;