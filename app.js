const express = require('express');
const app = express();

const dotenv = require('dotenv');

const connectDB = require('./config/database');

// setting up config.env file var
dotenv.config({ path: './config/config.env' });

// connecting to DB
connectDB();

// setup body parser
app.use(express.json());

// Import routes
const jobs = require('./routes/jobs');

app.use('/api/v1', jobs);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
