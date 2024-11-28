import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/predict', async (req, res) => {
    const inputData = req.body.image;  
    try {
        // const serviceEndpointURL = 'http://localhost:8080/predict';
        const serviceEndpointURL = 'http://ec2-3-142-196-190.us-east-2.compute.amazonaws.com:8080/predict';
        const response = await axios.post(serviceEndpointURL, {
            image: inputData
        });
        res.json({ number: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get response from prediction service.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
