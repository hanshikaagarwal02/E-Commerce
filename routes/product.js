const express=require('express');
const product=require('../models/Product')
const router=express.Router()
const Review = require('../models/Review');
const {isProductAuthor,validateProduct,isLoggedIn,isSeller}=require('../middleware')

// to show all product
router.get('/products',isLoggedIn,async(req,res)=>{
    try{
        let products=await product.find({})
    res.render('products/index',{products})
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
    
})

// to show form for new product
router.get('/products/new',isLoggedIn,(req,res)=>{
    try{
        res.render('products/new')
    }
    
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

// to actually add the product
router.post('/products',isLoggedIn,isSeller,validateProduct,async(req,res)=>{
    try{
        let {name,img,price,desc}=(req.body)
    await product.create({name,img,price,desc,author:req.user._id})
    req.flash('success','producted added successfully')
    res.redirect('/products')
    }
    

    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})


// to show a particular product
router.get('/products/:id',isLoggedIn,async(req,res)=>{
    try{
        let{id}=req.params
        let foundproduct=await product.findById(id).populate('reviews')
        res.render('products/show',{foundproduct,msg:req.flash('msg')})
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
   
})

// form to  edit the product
router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        let{id}=req.params
    let foundproduct=await product.findById(id)
    res.render('products/edit',{foundproduct})
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
    
})

// to actually edit a data in db
router.patch('/products/:id',isLoggedIn,validateProduct,async(req,res)=>{
    try{
        let{id}=req.params
    let{name,img,price,desc}=req.body
    await product.findByIdAndUpdate(id,{name,img,price,desc})
    req.flash('success','producted edited successfully')
    res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
    
})

// to delete a product
router.delete('/products/:id',isLoggedIn,isProductAuthor,async(req,res)=>{
    try{
        let{id}=req.params


    // deleting products and its reviews-----------(bekr method)--------
      const pro=await product.findById(id)
     for(let id of pro.reviews){
        await Review.findByIdAndDelete(id)
     }
    // --------------------------------

    await product.findByIdAndDelete(id)
    req.flash('success','producted deleted successfully')
    res.redirect('/products')
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
    
})

module.exports=router 



























