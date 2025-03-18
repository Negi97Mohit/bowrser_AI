const express = require('express');
const { Groq } = require('groq-sdk');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

const API_KEYS = [
    "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",
    "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",
    "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",
    "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"
];

let currentKeyIndex = 0;
const getApiKey = () => process.env.GROQ_API_KEY || API_KEYS[currentKeyIndex];
const rotateApiKey = () => {
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
};

let groq = new Groq({ apiKey: getApiKey() });

// Middleware
app.use(cors());
app.use(express.json());

// Store questions in memory (for demonstration purposes)
let questions = [];

// Endpoint to add a question
app.post('/add-question', (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    questions.push(question); // Add the question to the list
    res.status(200).json({ message: 'Question added successfully', questions });
});

// Endpoint to remove a question
app.post('/remove-question', (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    questions = questions.filter(q => q !== question); // Remove the question from the list
    res.status(200).json({ message: 'Question removed successfully', questions });
});

// Endpoint to get all questions
app.get('/get-questions', (req, res) => {
    res.status(200).json({ questions });
});

// Endpoint to answer selected questions
app.post('/answer-selected-questions', async (req, res) => {
    const { text, selectedQuestions } = req.body;

    if (!text || !selectedQuestions || !Array.isArray(selectedQuestions)) {
        return res.status(400).json({ error: 'Text and selected questions array are required' });
    }

    try {
        const answers = [];

        // Loop through each selected question and get an answer from the Groq API
        for (const question of selectedQuestions) {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'user',
                        content: `Here is some text: ${text}\n\nQuestion: ${question}\n\nAnswer the question based on the text.`,
                    },
                ],
                model: 'llama-3.3-70b-versatile',
            });

            const answer = response.choices[0]?.message?.content || 'No response from AI';
            answers.push({ question, answer });
        }

        res.status(200).json({ answers });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to ask a single question
app.post('/ask', async (req, res) => {
    const { text, question } = req.body;

    if (!text || !question) {
        return res.status(400).json({ error: 'Text and question are required' });
    }

    try {
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