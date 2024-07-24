import {Schema,model,models} from "mongoose";

const userSchema=new Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    image:{type:String},
})

const UserModel=models.User||model('User',userSchema)

export default UserModel;