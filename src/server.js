const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect("mongodb+srv://gopalk045:GeLZwRO2Y03v9fi3@cluster0.b5miggi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const contactSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone_number: String,
    message: String
});

// CORS middleware
const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `http://localhost:5001/contact`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
};

const Contact = mongoose.model('Contact', contactSchema);

app.use(cors({credentials: true, origin: true}));
app.use(allowCrossDomain);
app.use(express.json());

app.post('/contact-requests', async (req, res) => {
    const { first_name, last_name, email, phone_number, message } = req.body;

    const newContact = new Contact({ first_name, last_name, email, phone_number, message });

    try {
        await newContact.save();
        res.status(200).json({ message: 'Form submission saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
