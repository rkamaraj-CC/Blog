import {Schema,model,models} from "mongoose";

const postSchema=new Schema({
    title:{type:String},
    description:{type:String},
    image:{type:String},
    category:{type:String},
    photo:{type:String},
    created_by:{type:String},
    created_at:{type:Date},
    updated_at:{type:Date},
})

const PostModel= models.Post || model('Post',postSchema);

export default PostModel;