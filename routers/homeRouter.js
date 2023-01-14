const express = require("express");
const Router  = express.Router();
require('dotenv').config();
const HomeSchema = require("../models/userSchema");

require("../passport-setup")
const cookieSession = require('cookie-session')
const passport =require("passport");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
Router.use(bodyParser.json()) // for parsing application/json
Router.use(bodyParser.urlencoded({ extended: true }))
// const Razorpay = require('razorpay')

const transporter = nodemailer.createTransport({
  service:"hotmail",
  auth :{
      user: "shankarjatin1005@outlook.com",
      pass: "Jatin@1003j"
  }
})







// const razorpay = new Razorpay({
// key_id: "rzp_test_iQsqC7JbMx1RM2",
// key_secret: "CTtqBiR4a8g9hxgirSeJqgzX"
// })


Router.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


  const isLoggedIn = (req, res, next) => {
  
    if (req.user) {
     next();
    } else {
        res.sendStatus(401);
    }
}

Router.use(passport.initialize());
Router.use(passport.session());







Router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


Router.get('/google/callback',  passport.authenticate('google', {failureRedirect:"/failed"}),
function(req,res){
  res.redirect("/good");
}
 
)

Router.get('/failed', (req, res) => res.send('You Failed to log in!'))


Router.get('/good', isLoggedIn, (req, res) =>{
    res.render("pages/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})})


Router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


Router.post("/good",async(req,res)=>{
  try{
          const {
              name,
              email,
              prio1,
              prio2
          }=req.body;
          


                             const usermail = await HomeSchema.findOne({email:email}) 
                             if(usermail){res.render("pages/userexist")}
                           else { 
                            
                            const  userData = new HomeSchema({
                              name,
                              prio1,
                              prio2,
                              email
                             })
                             userData.save( err=>{
                              if(err){
                                  console.log(err)
                              }else{
                                console.log("data saved")
                                // res.render("pages/review",{name:req.user.displayName}) 
                                var user = HomeSchema.find({name})
                                user.exec(function(err,data){
                                  if(err){console.log(err)}
                                  else{
                                    console.log(data)
                                  }
                                })

                                const useremail = HomeSchema.findOne({email:email})
                                    const options1 ={
                                        from: "shankarjatin1005@outlook.com",
                                        to: req.body.email,
                                        subject: "Registration Notification!",
                                       html:'<h1>You have been Registered</h1><br><h1>Welcome !</h1>'
                                    
                                        };
                                      
                                            transporter.sendMail(options1,  (err, info)=> {
                                                if(err){
                                                console.log(err);
                                                return;
                                                }
                                                console.log("Sent: " + info.response);
                                                })

                                res.render("pages/afterPrio") 
                             
                              
                             }})}
         }
  
catch(e){
  console.log(e)
}})






module.exports = Router;