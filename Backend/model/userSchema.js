import mongoose  from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    phone:{type:Number,default:""}
    
})
const userDataSchema = mongoose.model("user",userSchema)
export default userDataSchema;