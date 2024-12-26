const mongoose=require('mongoose')
const passportlocalmongoose=require('passport-local-mongoose')


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        require:true
    },
    role:{
        type:String,
        required:true
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
    })

userSchema.plugin(passportlocalmongoose)

let User=mongoose.model('User',userSchema)
module.exports=User