import mongoose, {Schema,model} from "mongoose";

const ReviewSchema = new Schema({
    comment:{type:String,required:true},
    rating:{type:Number,required:true},
    userId:{type:Schema.Types.ObjectId,ref:"User",required:true},//in case i get an error, try changing Schema to mongoose.Schema.....
    productId:{type:Schema.Types.ObjectId,ref:"Product",required:true},
},{timestamps:true}); 

const Reviews = mongoose.model('Review',ReviewSchema);

export default Reviews;