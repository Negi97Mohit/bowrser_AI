const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');
const marked = require('marked'); // Import marked

dotenv.config();

const app = express();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const SITE_URL = process.env.SITE_URL || 'http://localhost:5000';
const SITE_NAME = process.env.SITE_NAME || 'My AI App';

// Middleware
app.use(cors());
app.use(express.json());

let questions = [];

app.post('/add-question', (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });
    questions.push(question);
    res.status(200).json({ message: 'Question added successfully', questions });
});

app.post('/remove-question', (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });
    questions = questions.filter(q => q !== question);
    res.status(200).json({ message: 'Question removed successfully', questions });
});

app.get('/get-questions', (req, res) => {
    res.status(200).json({ questions });
});

app.post('/answer-selected-questions', async (req, res) => {
    const { text, selectedQuestions } = req.body;
    if (!text || !Array.isArray(selectedQuestions)) {
        return res.status(400).json({ error: 'Text and selected questions array are required' });
    }
    try {
        const answers = [];
        for (const question of selectedQuestions) {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': SITE_URL,
                    'X-Title': SITE_NAME,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'deepseek/deepseek-chat:free',
                    messages: [{
                        role: 'user',
                        content: `Here is some text: ${text}\n\nQuestion: ${question}\n\nAnswer the question based on the text.`,
                    }],
                }),
            });
            const data = await response.json();
            const answer = data.choices?.[0]?.message?.content || 'No response from AI';
            answers.push({ question, answer: marked.parse(answer) }); // Convert Markdown to HTML
        }
        res.status(200).json({ answers });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/ask', async (req, res) => {
    const { text, question } = req.body;
    if (!text || !question) {
        return res.status(400).json({ error: 'Text and question are required' });
    }
    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': SITE_URL,
                'X-Title': SITE_NAME,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'deepseek/deepseek-chat:free',
                messages: [{
                    role: 'user',
                    content: `Here is some text: ${text}\n\nQuestion: ${question}\n\nAnswer the question based on the text.`,
                }],
            }),
        });
        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content || 'No response from AI';
        res.status(200).json({ profile: marked.parse(aiResponse) }); // Convert Markdown to HTML
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});