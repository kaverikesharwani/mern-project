require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
console.log('🔍 Connecting to:', uri ? 'URI found ✅' : 'URI missing ❌');

mongoose.connect(uri)
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ Connection failed:', err);
  });
