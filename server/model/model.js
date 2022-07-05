const mongoose= require("mongoose");
var schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        surname: String,
        email:{
            type:String,
            unique:true
        },
        phone:{
            type:Number,
            unique:true
        },
        gender: String,
        status: String,
        comments:String,

    }
)

const Userdb=mongoose.model("userdb",schema);

module.exports=Userdb;