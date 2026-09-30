const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

const { connectToMongoDB } = require('./connect');

connectToMongoDB(process.env.MONGODB_URI,()=>console.log('Connected to MongoDB'));

const urlRoute = require('./routes/url');
app.use(express.json());
app.use('/api/url', urlRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));