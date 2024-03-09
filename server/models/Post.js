import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    description: {type: String, required: true},
    picturePath: {type: String, required: true},
})

const Post = mongoose.model('Post', postSchema);
export default Post;