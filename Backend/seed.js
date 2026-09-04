import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/product.model.js';
import connectDB from './src/config/db.js';

dotenv.config();
connectDB();

const emiPlansBase = [
  { months: 3, monthlyAmount: 44967, interestRate: 0, cashback: 7500 },
  { months: 6, monthlyAmount: 22483, interestRate: 0, cashback: 7500 },
  { months: 12, monthlyAmount: 11242, interestRate: 0, cashback: 7500 },
  { months: 24, monthlyAmount: 5621, interestRate: 0, cashback: 7500 },
  { months: 36, monthlyAmount: 4297, interestRate: 10.5, cashback: 7500 },
];

const generateEmiPlans = (price) => emiPlansBase.map(plan => ({
  ...plan,
  monthlyAmount: Math.round(price / plan.months)
}));

const products = [
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    category: 'Smartphones',
    variants: [
      { 
        label: '256GB - Silver', color: '#e5e5ea', storage: '256GB', mrp: 134900, price: 127400, 
        images: ['https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg'],
        emiPlans: generateEmiPlans(127400)
      },
      { 
        label: '256GB - Titanium', color: '#5c5b57', storage: '256GB', mrp: 134900, price: 127400, 
        images: ['https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg'],
        emiPlans: generateEmiPlans(127400)
      },
      { 
        label: '512GB - Gold', color: '#f0d9b5', storage: '512GB', mrp: 154900, price: 147400, 
        images: ['https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro-max-.jpg'],
        emiPlans: generateEmiPlans(147400)
      }
    ]
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-s24-ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    variants: [
      { 
        label: '256GB - Black', color: '#000000', storage: '256GB', mrp: 129999, price: 119999, 
        images: ['https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g-sm-s928-1.jpg'],
        emiPlans: generateEmiPlans(119999)
      },
      { 
        label: '512GB - Grey', color: '#d1d1d1', storage: '512GB', mrp: 139999, price: 129999, 
        images: ['https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-ultra-5g.jpg'],
        emiPlans: generateEmiPlans(129999)
      }
    ]
  },
  {
    name: 'Google Pixel 9 Pro',
    slug: 'google-pixel-9-pro',
    brand: 'Google',
    category: 'Smartphones',
    variants: [
      { 
        label: '128GB - White', color: '#ffffff', storage: '128GB', mrp: 99999, price: 89999, 
        images: ['https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8-pro.jpg'],
        emiPlans: generateEmiPlans(89999)
      },
      { 
        label: '256GB - Black', color: '#000000', storage: '256GB', mrp: 109999, price: 99999, 
        images: ['https://fdn2.gsmarena.com/vv/bigpic/google-pixel-7-pro.jpg'],
        emiPlans: generateEmiPlans(99999)
      }
    ]
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
