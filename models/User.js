const mongoose = require ("mongoose")
const { Schema } = mongoose;


const  UserSchema  = new Schema ({
    username: {
        type:String,
        required:true,
        min:3,
        max:25,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6,
        
    },
    desc:{
        type:String,
        max:200
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    likes:{
        type:Array,
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

module.exports = mongoose.model("User",UserSchema)