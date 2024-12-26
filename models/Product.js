const mongoose=require('mongoose')
const Review = require('./Review')
const User = require('./User')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true,
        
    },
    price:{
        type:Number,
        // min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true
    },
    // avgRating:{
    //     type:Number,
    //     default:0
    // },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
        
    }],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})


// middleware jo bts mongodb operation krwane pr use hota h and iske andr pre and post middleware hote hai which is basically used over the schema and before the model is js class


// ---------deleting reviews and prduct on production level-------------

// productSchema.post('findOneAndDelete',async function(pro){
//     if(pro.reviews.length>0){
//         await Review.deleteMany({_id:{$in:product.reviews}})
//     }
// })

// --------------------------
let Product=mongoose.model('Product',productSchema)
module.exports=Product