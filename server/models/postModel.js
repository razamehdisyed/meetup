import mongoose, { Schema } from "mongoose";

//Schema

const postSchema = new mongoose.Schema (
    {
        userId: { type: Schema.Types.ObjectId, ref: "Users"},
        description: { type: String, required: true},
        image: { type: String },
        likes: [{ type: String }],
        Comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
    },
        {timestamps: true}
)
const Posts = mongoose.model("Post", postSchema)
export default Posts