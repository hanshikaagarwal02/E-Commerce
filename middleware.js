const product = require('./models/Product')
const {productSchema , reviewSchema}=require('./schema')

const validateProduct=(req,res,next)=>{
    let{name,img,price,desc}=req.body
    const{error}=productSchema.validate({name,img,price,desc})
    if(error){
        return res.render('error')
    }
    next();
}

const validateReview=(req,res,next)=>{
    let{rating,comment}=req.body
    const{error}=reviewSchema.validate({rating,comment})
    if(error){
        return res.render('error')
    }
    next();
}

const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','please login first')
        return res.redirect('/login')
    }
    next()
}

const isSeller=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error','You dont have access')
        return res.redirect('/products')
    }
    else if(req.user.role!=='seller'){
        req.flash('error','You dont have access to do that')
        return res.redirect('/products')
    }
    next()
}

const isProductAuthor=async(req,res,next)=>{
   let{id}=req.params
   let prod=await product.findById(id)
   if(!prod.author.equals(req.user._id)){
    req.flash('error','You dont have access to do that because you are not author of this product')
    return res.redirect('/products')
   }
   next()
}

module.exports={isProductAuthor,isSeller,isLoggedIn,validateReview,validateProduct}