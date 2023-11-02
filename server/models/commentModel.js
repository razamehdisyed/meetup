import mongoose, { Schema } from "mongoose";

//Schema

const commentSchema = new mongoose.Schema ( {
        userId: { type: Schema.Types.ObjectId, ref: "Users"},
        postId: { type: Schema.Types.ObjectId, ref: "Posts"},
        comment: { type: String, required: true},
        from: { type: String, required: true},
        replies: [
            {
                
                rId: { type: Schema.Types.ObjectId},
                userId: { type: Schema.Types.ObjectId, ref: "Users"},
                from: { type: String},
                comment: { type: String},
                replyAt: { type: String},
                created_At: { type: Date, default: Date.now() },
                updaetd_At: { type: Date, default: Date.now() },
                likes: [{ type: String}],
                
            }
        ],
        likes: [{ type: String}],
    },
        { timestamps: true}
    )
    const Comments = mongoose.model("Comments", commentSchema)
    export default Comments