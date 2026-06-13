// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"


const BASE_URL = import.meta.env.VITE_API_URL
const Dashboard = () => {
    const [subjects, setSubjects] = useState([])
    const [name, setName] = useState("")
    const [examDate, setExamDate] = useState("")
    const [loading, setLoading] = useState(false)
    const [aiPlan, setAiPlan] = useState("")
    const [aiLoading, setAiLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)

    const { user, token, logout } = useAuth()
    const navigate = useNavigate()

    // Subjects Fetch Karo
    const fetchSubjects = async () => {
        try {
            const res = await axios.get(
                `${BASE_URL}/api/subjects`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setSubjects(res.data.subjects)
        } catch (err) {
            console.log(err)
        }
    }

    // Subject Add Karo
    const addSubject = async () => {
        if (!name || !examDate) return
        setLoading(true)
        try {
            await axios.post(
                `${BASE_URL}/api/subjects`,
                { name, examDate },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setName("")
            setExamDate("")
            setShowForm(false)
            fetchSubjects()
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    // Subject Delete Karo
    const deleteSubject = async (id) => {
        try {
            await axios.delete(
                `${BASE_URL}/api/subjects/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            fetchSubjects()
        } catch (err) {
            console.log(err)
        }
    }

    // AI Plan Lo
    const getAiPlan = async () => {
        setAiLoading(true)
        setAiPlan("")
        try {
            const res = await axios.get(
                `${BASE_URL}/api/ai/study-plan`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setAiPlan(res.data.plan)
        } catch (err) {
            console.log(err)
        }
        setAiLoading(false)
    }

    // Days Remaining Calculate Karo
    const daysLeft = (examDate) => {
        const today = new Date()
        const exam = new Date(examDate)
        const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24))
        return diff
    }

    useEffect(() => {
        fetchSubjects()
    }, [])

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Navbar */}
            <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white">
                        📚 Study Planner
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-400">
                            Hey, {user?.name}! 👋
                        </span>
                        <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 
                            px-4 py-2 rounded-lg text-sm transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* AI Study Plan Section */}
                <div className="bg-gray-900 rounded-2xl p-6 mb-8 
                border border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">
                            🤖 AI Study Plan
                        </h2>
                        <button
                            onClick={getAiPlan}
                            disabled={aiLoading}
                            className="bg-purple-600 hover:bg-purple-700 
                            px-4 py-2 rounded-lg text-sm transition"
                        >
                            {aiLoading ? "Generating..." : "✨ Generate Plan"}
                        </button>
                    </div>

                    {aiPlan ? (
                        <div className="bg-gray-800 rounded-xl p-4 
                        text-gray-300 whitespace-pre-wrap text-sm">
                            {aiPlan}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">
                            Generate button dabao — AI aaj ka study plan 
                            banayega! 🎯
                        </p>
                    )}
                </div>

                {/* Subjects Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        Your Subjects
                    </h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-blue-600 hover:bg-blue-700 
                        px-4 py-2 rounded-lg text-sm transition"
                    >
                        {showForm ? "Cancel" : "+ Add Subject"}
                    </button>
                </div>

                {/* Add Subject Form */}
                {showForm && (
                    <div className="bg-gray-900 rounded-2xl p-6 mb-6 
                    border border-gray-800">
                        <div className="flex gap-4 flex-wrap">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Subject name (e.g. Maths)"
                                className="flex-1 bg-gray-800 text-white 
                                px-4 py-3 rounded-lg border border-gray-700 
                                focus:outline-none focus:border-blue-500"
                            />
                            <input
                                type="date"
                                value={examDate}
                                onChange={(e) => setExamDate(e.target.value)}
                                className="bg-gray-800 text-white px-4 py-3 
                                rounded-lg border border-gray-700 
                                focus:outline-none focus:border-blue-500"
                            />
                            <button
                                onClick={addSubject}
                                disabled={loading}
                                className="bg-green-600 hover:bg-green-700 
                                px-6 py-3 rounded-lg transition"
                            >
                                {loading ? "Adding..." : "Add"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Subjects Grid */}
                {subjects.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        <p className="text-5xl mb-4">📚</p>
                        <p>Koi subject nahi hai abhi!</p>
                        <p className="text-sm mt-2">
                            "Add Subject" dabao aur shuru karo!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 
                    lg:grid-cols-3 gap-6">
                        {subjects.map((subject) => (
                            <div
                                key={subject._id}
                                className="bg-gray-900 rounded-2xl p-6 
                                border border-gray-800 hover:border-blue-500 
                                transition cursor-pointer"
                            >
                                {/* Subject Name */}
                                <div className="flex justify-between 
                                items-start mb-4">
                                    <h3 className="text-lg font-semibold">
                                        {subject.name}
                                    </h3>
                                    <button
                                        onClick={() => deleteSubject(subject._id)}
                                        className="text-red-400 
                                        hover:text-red-300 text-sm"
                                    >
                                        🗑️
                                    </button>
                                </div>

                                {/* Days Left */}
                                <div className={`text-sm mb-4 font-medium
                                    ${daysLeft(subject.examDate) <= 3
                                        ? 'text-red-400'
                                        : daysLeft(subject.examDate) <= 7
                                            ? 'text-yellow-400'
                                            : 'text-green-400'
                                    }`}>
                                    📅 Exam: {daysLeft(subject.examDate)} 
                                    days left
                                </div>

                                {/* Open Button */}
                                <button
                                    onClick={() => navigate(
                                        `/subject/${subject._id}`
                                    )}
                                    className="w-full bg-blue-600 
                                    hover:bg-blue-700 py-2 rounded-lg 
                                    text-sm transition"
                                >
                                    Open →
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard