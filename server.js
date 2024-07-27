const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define Mongoose Schema
const dataSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    address: String,
    phone: String,
});

const Data = mongoose.model('Data', dataSchema);


const accountSid = 'AC35b6375db49bca49bb0f2cf353f58bdb'; 
const authToken = 'db33046d88d51b07883f3c21357603f8';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = '+12073456621'; 

app.post('/form', async (req, res) => {
    try {
        const { name, amount, address, phone } = req.body;
        const newData = new Data({ name, amount, address, phone });
        await newData.save(); 

        
        const message = await twilioClient.messages.create({
            body: `Thank you for the coming out wedding function 💕 your form submission:\nName: ${name}\nAmount: ${amount}\nAddress: ${address}\nPhone: ${phone}`,
            from: twilioPhoneNumber,
            to: phone,
        });

        res.status(200).json({ success: true, message: 'Data saved and SMS sent', twilioMessageSid: message.sid });
    } catch (err) {
        res.status(500).json({ error: 'Error saving data or sending SMS' });
    }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
