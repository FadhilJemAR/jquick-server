import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

    const createdProduct = await product.save();
   return res.status(201).json({message:'Berhasil menambahkan produk',createdProduct});
  } catch (error) {
   return res
      .status(500)
      .json({ message: "Gagal menambahkan produk", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller','-password').lean();
   return res.json({message:'Berhasil mengambil produk',products});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil produk", error: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({_id:productId}).lean();
    return res.json({message:'Berhasil mengambil produk',product});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil produk", error: error.message });
  }
};

export const searchProducts = async (req,res)=>{
  try {
    const keyword = req.query.keyword;
    if(keyword){
      const products = await Product.find({name:{$regex:keyword,$options:'i'}});
      if(products.length == 0){
       return  res
        .status(400)
        .json({message:'Produk tidak ditemukan'});
      }else{
       return res
          .status(200)
          .json({message:'Berhasil mencari produk',products});
      }
    }else{
     return res
        .status(400)
        .json({message:'Kesalahan dalam endpoint pencarian'})
    }
  } catch (error) {
    res
      .status(500)
      .json({message:"Gagal mencari produk",error:error.message})
  }
}