import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'Product'
    },
    quantity:Number
},{timestamps:true})

const Cart = mongoose.model('Cart',CartSchema);

export default Cart