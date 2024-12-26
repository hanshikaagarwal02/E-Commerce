const express=require('express')
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seeddb=require('./seed')
const ejsmate=require('ejs-mate')
const methodOverride = require('method-override')
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/User')

const productRoutes=require('./routes/product')
const reviewroute=require('./routes/review')
const authroutes=require('./routes/auth')
const cartroutes=require('./routes/cart')


mongoose.connect('mongodb://127.0.0.1:27017/shopping')
.then(()=>{console.log('db connected sucessfully')})
.catch((error)=>{console.log(error,'db err')})

// seeding database
// seeddb()

// session
let configsession={
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
     cookie: { 
          httpOnly:true,
          expires:Date.now()+7*24*60*60*1000,
          maxAge:7*24*60*60*1000

      }
  }



app.engine('ejs',ejsmate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session(configsession))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.currentUser=req.user
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')
    next()
})


// passport
passport.use(new LocalStrategy(User.authenticate()));



app.use(productRoutes)
app.use(reviewroute)
app.use(authroutes)
app.use(cartroutes)

app.listen(8080,()=>{
    console.log("server is connected at port 8080")
})