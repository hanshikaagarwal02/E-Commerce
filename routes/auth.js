
const express = require('express');
const User = require('../models/User');
const router=express.Router()
const passport=require('passport')

// to show a form or signup
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

// to actually want a register a user in db
router.post('/register',async(req,res)=>{
    try{
        let{username,email,password,role}=req.body
    const user=new User({email,username,role})
    const newUser=await User.register(user,password)
    // res.redirect('/login')
    req.login(newUser,function(err){
        if(err){
            return next(err);
        }
        req.flash('success','welcome! , you are registered successfully')
        return res.redirect('/products')
    })
    }
    catch(e){
        req.flash('error',e.message)
        return res.redirect('/signup')
    }
    
})

// to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login')
})

// to actually login by db
router.post('/login',
    passport.authenticate('local', 
    { failureRedirect: '/login', failureMessage: true }),
    (req,res)=>{
        
        req.flash('success','welcome !')
        res.redirect('/products')
})

// logout
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout()
    }
    req.flash('success','Good Bye !')
        res.redirect('/login')
})

module.exports = router;
