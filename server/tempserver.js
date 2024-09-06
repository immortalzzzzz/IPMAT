const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');

const UserData = require('./userDataModel'); // Import the corrected UserData model

const app = express();

app.use(bodyParser.json());

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

mongoose.connect('mongodb://localhost:27017/Ipmat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => {
        console.log('Server started on port 5000');
    });
}).catch(error => {
    console.error('MongoDB connection error:', error);
});
