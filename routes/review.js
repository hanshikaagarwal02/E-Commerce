
const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router(); //mini application
const {validateReview}=require('../middleware')

// review route
router.post('/products/:id/review' ,validateReview, async(req,res)=>{
    try{
        let { rating , comment } = req.body;
    let { id } = req.params;

    let product = await Product.findById(id);
    // new review using class
    let review  = new Review({ rating , comment });

    product.reviews.push(review);

    await product.save();
    await review.save(); 
    req.flash('success','review added successfully')
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
    
})

module.exports = router;
