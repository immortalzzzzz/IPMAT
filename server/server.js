const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const Quiz = require('./quizModel');
const Notes = require('./notesModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./userModel');
const UserData = require('./userDataModel');
const { body, validationResult } = require('express-validator');
const axios = require('axios');
const Package = require('./packagesDataModel');

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    })
);
const JWT_SECRET = 'password';
const RECAPTCHA_SECRET_KEY = '6Ldph_MpAAAAAHAjAMC_jZieY31US5E7ZV0yVE4d';



mongoose.connect('mongodb://localhost:27017/Ipmat', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get('/api/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/quiz/:quizId', async (req, res) => {
    const quizId = req.params.quizId;
    try {
        const quiz = await Quiz.findOne({ id: quizId });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Notes.find();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/notes/:noteId', async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const note = await Notes.findOne({ id: noteId });
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});









app.post('/api/signup', [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must have at least one uppercase letter, one lowercase letter, one number, and one special character'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, age, password, captcha } = req.body;

    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`);
        if (!response.data.success) {
            return res.status(400).json({ error: 'Captcha validation failed' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, age, password: hashedPassword });
        const userData = new UserData({
            email,
            name,
            purchases: { notes: [], quizzes: [], lectures: [], lives:[] }, // Corrected object syntax
            progress: { notes: [], quizzes: [], lectures: [], lives:[] } // Corrected object syntax
        });
        await user.save();
        await userData.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password, captcha } = req.body;

    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`);
        if (!response.data.success) {
            return res.status(400).json({ error: 'Captcha validation failed' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const userData = await UserData.findOne({ email });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token,userData });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});








app.get('/api/packages', async (req, res) => {
    try {
      const packages = await Package.find();
      res.json(packages);
    } catch (error) {
      res.status(500).send(error);
    }
  });





  app.get('/api/packages/:packageId', async (req, res) => {
    const packageId = req.params.packageId;
    try {
        const package = await Package.findOne({ id: packageId });
        if (!package) {
            return res.status(404).json({ error: 'Package not found' });
        }
        res.json(package);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});







const razorpay = new Razorpay({
    key_id: 'rzp_test_tBCKVt4YuwuDxc',
    key_secret: '4SknPkeSFinXksv51v2P1J7W'
});

app.post('/api/create-order', async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount,
        currency: 'INR',
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        
        res.status(500).send(error);
    }
});

app.post('/api/verify-payment', async (req, res) => {
    const { paymentId, orderId, signature, email ,quizIds, notesIds, lectureIds } = req.body;

    const hmac = crypto.createHmac('sha256', '4SknPkeSFinXksv51v2P1J7W');
    hmac.update(orderId + "|" + paymentId);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
        try {
            // Update user data in MongoDB
            const userId = 'current-user-id'; // Replace with actual user ID from your context/session
            const user = await UserData.findOne({email});

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            // Add purchased items to the user's purchases
            user.purchases.notes.push(...notesIds);
            user.purchases.quizzes.push(...quizIds);
            user.purchases.lectures.push(...lectureIds);

            await user.save();

            res.json({ success: true, updatedUserData: user });
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});