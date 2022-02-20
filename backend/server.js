const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDb = require('./config/db');

const port = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bios', require('./routes/bioRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/drugs', require('./routes/drugRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
