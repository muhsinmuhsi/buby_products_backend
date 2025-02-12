
import products from '../Models/productmodel.js'
import User from '../Models/userModel.js';

export const viewproduct = async (req, res) => {
  const produt = await products.find();
  
  if (produt.length === 0) {
      res.status(404).json({message: 'unable to get products'});
      return; // Make sure to return here to stop execution
  }
  
  res.status(200).json({
      status: "success", 
      message: 'successfully fetched data',
      data: produt
  });
};

export const productById = async (req, res) => {
  const productId = req.params.id;
  const product = await products.findById(productId);
  
  if (!product) {
      res.status(404).json({
          error: 'not found',
          message: 'product not found'
      });
      return;
  }
  
  res.status(200).json({ product });
};

export const productBycategory = async (req, res, next) => {
  const { categoryname } = req.params;

  const product = await products.find({
      $or: [
          { category: { $regex: new RegExp(categoryname, 'i') } },
          { title: { $regex: new RegExp(categoryname, 'i') } }
      ]
  });

  if (product.length === 0) {
      res.status(404).json({ message: "Item not found" });
      return;
  }

  res.status(200).json(product);
};

export const orderbyid = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate({
      path: "orders",
      populate: { path: "productId" },
  });

  if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
  }

  if (!user.orders || user.orders.length === 0) {
      res.status(200).json({ message: 'No orders yet', data: [] });
      return;
  }

  res.status(200).json(user.orders);
};