/**
 * @author: Yu-Ning, Chang 
 * This file configures user identity routes.
 * 
 * API I use in my code, license details can be found in "node_modules" package.
 * =====================
 * "express": "^4.16.3"
 */
var express=require('express'),
    router=express.Router(),
    // Use pool configured in databasePool.js to execute postgreSQL command.
    pool=require('../models/databasePool.js');

// It tells a user's account is valid or not. Default value is true.
var accountCheck=true;


/**
 * "GET" request
 * Render the log_in page
 */ 
router.get('/',function(req, res) {
    res.render('demoLogin',{accountCheck:accountCheck});
});

/**
 * "GET" request
 * Render the log_in page
 */ 
router.get('/demo/log_in',function(req, res) {
    res.render('demoLogin',{accountCheck:accountCheck});
});

/**
 * "POST" request
 *  Verify the user's account and redirect to the project page.
 */ 
router.post('/demo/log_in',function(req,res){
    
    // SQL query
    pool.query('SELECT COUNT (user_id) FROM member WHERE account=$1',[req.body.account],(err,result)=>{
       if(err){console.log(err)}
       // If the user's account does exist, it redirects to the project page. Otherwise, it returns 'false' value to the front-end.
       if(result.rows[0].count!=0){
           pool.query('SELECT * FROM member WHERE account=$1',[req.body.account],(err,result)=>{
               if(err){console.log(err)}
               res.redirect('/user_'+result.rows[0].user_id+'/projects');
           })
       }else{
           console.log("account does not exist");
           accountCheck=false;
           res.render('demoLogin',{accountCheck:accountCheck});
       }
    });
});

module.exports=router;



// The route below is used for commercial level (pending)
// function outsideUser(){

//     //member sign up,  store data to member table,** don't know how to let user know they can't sign up
//     // app.get('/user/sign_up',function(req, res) {
//     //     res.render('signup');
//     // });
    
//     // app.post('/user/sign_up',function(req, res) { 
//     //     pool.query('SELECT COUNT (user_id) FROM member WHERE account=$1',
//     //         [req.body.account],(err,queryResult)=>{
//     //                 if(err){console.log(err);}
//     //                 if(queryResult.rows[0].count!=0){
//     //                   console.log("the account has exsited");
//     //                 }else{
                        
//     //                     pool.query('INSERT INTO member(join_date,account,password,username) VALUES(CURRENT_DATE,$1,$2,$3)',
//     //                                  [req.body.account,req.body.password,req.body.userName],(err,result)=>{
//     //                                     if(err){ console.log(err);}
//     //                                     res.redirect('/user/log_in');
//     //                                  });
//     //                 }
//     //         });
//     // });
      
//     // user log in and authentication 
//     // app.get('/user/log_in',function(req, res) {
//     //     res.render('login');
//     // });
    
//     // app.post('/user/log_in',function(req,res){
//     //     // if the account exist or passowrd is  correct
//     //     pool.query('SELECT COUNT (user_id) FROM member WHERE account=$1',[req.body.account],(err,accountCheck)=>{
//     //       if(err){console.log(err)}
//     //       // if the account does exist
//     //       if(accountCheck.rows[0].count!=0){
//     //           pool.query('SELECT * FROM member WHERE account=$1',[req.body.account],(err,passwordCheck)=>{
//     //               if(err){console.log(err)}
//     //               var password=req.body.password;
//     //               // if password is correct
//     //               if(passwordCheck.rows[0].password==password){
//     //                   res.redirect('/user_'+passwordCheck.rows[0].user_id+'/projects');
//     //               }else{
//     //                   console.log("password is not correct");
//     //               }
//     //           })
//     //       }else{
//     //           console.log("account does not exist");
//     //       }
//     //     }
//     //     );
//     // });
    
//     // query user details
//     // app.get('/user_:user/setting',function(req,res){
//     //     var userID=req.params.user;
//     //     pool.query('SELECT * FROM member WHERE user_id=$1',[userID],(err, result) => {
            
//     //     if(err){console.log("Failed "+ err);}
        
//     //     res.render('setting',{userID:userID,userDetails:result.rows[0]});
//     //     // pool.end();
//     //     })
//     // })
    
//     // update user's details
//     // app.post('/user_:user/setting',function(req,res){
//     //      var userID=req.params.user; 
//     //      var oldPassword=req.body.oldPassword;
         
//     //      pool.query('SELECT password FROM member WHERE user_id=$1',[userID],(err,queryResult)=>{
//     //          if(err){console.log("Failed "+ err)}
//     //          // if old password is correct
//     //          if(queryResult.rows[0].password==oldPassword){
//     //               pool.query('UPDATE member SET password=$1 WHERE user_id=$2',[req.body.newPassword,userID],(err, result) => {
//     //                  if(err){console.log("Failed "+ err)}
    
//     //                  res.redirect('/user_'+userID+'/setting');
//     //                 // pool.end();
//     //                 })
//     //          }else{
//     //              console.log("password wrong");
//     //          }
//     //      })
//     // })
// }