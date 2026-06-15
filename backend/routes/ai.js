// backend/routes/ai.js
const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const protect = require('../middleware/authMiddleware.js');
const Task = require('../models/Task.js');
const Subject = require('../models/Subject.js');

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.get('/study-plan', protect, async (req, res) => {
    try {
        const subjects = await Subject.find({ user: req.user.id });

        console.log("Gemini Key:", process.env.GEMINI_API_KEY);
        const tasks = await Task.find({
            user: req.user.id,
            completed: false
        });

        const prompt = `
Ek student ka study data hai:

Subjects aur Exam Dates:
${JSON.stringify(subjects.map(s => ({
    name: s.name,
    examDate: s.examDate
})))}

Pending Tasks:
${JSON.stringify(tasks.map(t => ({
    title: t.title,
    priority: t.priority
})))}

Aaj ki date: ${new Date().toDateString()}

Iske basis pe ek short study plan do:

1. Aaj kya padhna chahiye?
2. Har subject ko kitna time dena chahiye?
3. Kaunsa task most urgent hai?

Short, clear aur bullet points mein batao.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        res.json({
            plan: response.text
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;