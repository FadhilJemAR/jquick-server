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
    res.status(201).json({message:'Berhasil menambahkan produk',createdProduct});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menambahkan produk", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.json({message:'Berhasil mengambil produk',products});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil produk", error: error.message });
  }
};
