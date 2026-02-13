import Cart from '../models/Cart.js';

export const addProductUserCart = async(req,res)=>{
    try {
        const userId = req.userId;
        const {productId,quantity} = req.body;
        const addToCart = await Cart.create({userId,productId,quantity});
        if(addToCart){
            return res 
                    .status(200)
                    .json({message:'Berhasil menambahkan ke keranjang'});
        }
    } catch (error) {
        return res.status(500).json({message:'Gagal menambahkan ke keranjang', error:error.message})
    }
}