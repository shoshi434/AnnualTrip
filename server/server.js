require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { default: mongoose } = require('mongoose');

connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/teachers', require('./router/teacher'));
app.use('/api/auth', require('./router/auth'));

//run

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error');
  });

});