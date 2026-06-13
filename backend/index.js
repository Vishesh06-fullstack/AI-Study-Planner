const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./db.js')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/subjects', require('./routes/subject'))
app.use('/api/tasks', require('./routes/tasks'))
app.use('/api/ai', require('./routes/ai'))

app.get('/', (req, res) => {
    res.json({message: "Study Planner API Chal Raha Hai! 🚀"})
})

app.listen(process.env.PORT, () => {
    console.log(`Server chal raha hai port ${process.env.PORT} pe! ✅`)
})