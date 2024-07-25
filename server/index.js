const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const createUserModal = require('./modules/cuser');
const Usermodel = require('./modules/user');
const Mealtype = require('./modules/meal');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET; 

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Database Connection
mongoose.connect('mongodb://localhost:27017/Zomato', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Routes
app.post('/signup', async (req, res) => {
    const { Firstname, Lastname, Email, Password } = req.body;

    // Basic validation
    if (!Firstname || !Lastname || !Email || !Password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        // Check if user already exists
        const existingUser = await createUserModal.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Create new user
        const newUser = new createUserModal({
            Firstname,
            Lastname,
            Email,
            Password: hashedPassword,
        });

        // Save user to database
        const result = await newUser.save();
        console.log('User created successfully:', result);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { Email, Password } = req.body;
    console.log('Login attempt:', { Email, Password }); // Debugging log

    try {
        const user = await createUserModal.findOne({ Email });
        if (!user) {
            console.log('User not found'); // Debugging log
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            console.log('Password mismatch'); // Debugging log
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful:', { token }); // Debugging log
        res.json({ token });
    } catch (err) {
        console.error('Server error:', err); // Debugging log
        res.status(500).json({ message: 'Server Error' });
    }
});


app.get('/protected', (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ message: 'You are authorized', user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
});

app.get('/location', async (req, res) => {
    try {
        const data = await Usermodel.find({});
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/mealtype', async (req, res) => {
    try {
        const data = await Mealtype.find({});
        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/searchRestaurants', async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const data = await Usermodel.find({ name: { $regex: searchQuery, $options: 'i' } });
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/createUser', async (req, res) => {
    try {
        const data = await Usermodel.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Start Server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
