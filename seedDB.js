const mongoose = require('mongoose');
const config = require('config');
const { ProductPlan } = require('./model/ProductPlan');
require('dotenv').config();


const data = {
  ProductPlan: [
    {
      id: 1,
      title: 'Free Plan',
      price: 'Free',
      features: [
        'Access to flashcards',
        'Basic pronunciation',
        'Writing Mock Exam',
      ],
    },
    {
      id: 2,
      title: 'Basic Plan',
      price: '$9.99/mo',
      features: [
        'All Free Plan features',
        'Upload custom flashcards',
        'AI pronunciation for PTE and IELTS',
        'Advance Mock Exam',
      ],
    },
    {
      id: 3,
      title: 'Advanced Plan',
      price: '$19.99/mo',
      features: [
        'All Basic Plan features',
        'Unlimited custom flashcards',
        'Track Progress',
      ],
    },
  ],
};

async function seed() {
  await mongoose.connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('Connected to MongoDB...');

  // Remove existing product plans
  await ProductPlan.deleteMany();

  console.log('Deleted existing product plans.');

  // Add new product plans
  await ProductPlan.insertMany(data.ProductPlan);

  console.log('Seeded product plans.');

  mongoose.disconnect();

  console.log('Disconnected from MongoDB.');
}

seed().catch((error) => console.error(error.message));

// to run the seed : write :  node seedDB.js 