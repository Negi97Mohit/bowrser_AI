const express = require('express');
const { Groq } = require('groq-sdk');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to handle questions
app.post('/ask', async (req, res) => {
    const { text, question } = req.body;

    if (!text || !question) {
        return res.status(400).json({ error: 'Text and question are required' });
    }

    try {
        // Send the extracted text and question to the Groq API
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: `Here is some text: ${text}\n\nQuestion: ${question}\n\nAnswer the question based on the text.`,
                },
            ],
            model: 'llama-3.3-70b-versatile',
        });

        const aiResponse = response.choices[0]?.message?.content || 'No response from AI';

        res.status(200).json({ profile: aiResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});