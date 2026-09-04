import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  label: String,        // e.g. "256GB - Orange"
  color: String,
  storage: String,
  mrp: Number,
  price: Number,
  images: [String],
  emiPlans: [{
    months: Number,          // 3, 6, 12, 24...
    monthlyAmount: Number,
    interestRate: Number,    // 0 or 10.5
    cashback: Number
  }]
});

const productSchema = new mongoose.Schema({
  name: String,          // "iPhone 17 Pro"
  slug: { type: String, unique: true }, // "iphone-17-pro"
  brand: String,
  category: String,
  variants: [variantSchema]
});

const Product = mongoose.model('Product', productSchema);

export default Product;
