import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
dotenv.config();

const __dirname = path.resolve();

const app = express()

app.use(express.json())
app.use(cors())

app.get('/getQuote', async (req, res) => {
    const apiKey = process.env.API_KEY
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=success',{
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json', 
            }
        });
        
        const data = await response.json();
        res.status(200).json(data[0]);
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        const message = error.message || 'Internal Server Error'
        res.status(statusCode).json({
            success: false,
            message,
            statusCode
        })
    }
})

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})

