export const addProductUserCart = async(req,res)=>{
    try {
        const {productId,quantity} = req.body;
      
        return res.json({productId,quantity})
    } catch (error) {
        return res.status(500).json({message:'Gagal menambahkan ke keranjang'})
    }
}