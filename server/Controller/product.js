import Product from "../models/Product.js";


export const getProducts = async (req,res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch(err){
        res.status(404).json({errors: err.message});
    }
}


export const getCategoryProduct = async (req,res) =>{
    try{
        const { category } = req.params;
        const products = await Product.find({category});
        res.status(200).json(products);
    } catch(err){
        res.status(404).json({erros:err.message});
    }
}

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId); // ✅ Added await

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message }); // ✅ Changed to 500 for internal server error
  }
};
