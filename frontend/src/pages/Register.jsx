// frontend/src/pages/Register.jsx
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleRegister = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await axios.post(
                `${BASE_URL}/api/auth/register`,
                { name, email, password }
            )

            if (res.data.user) {
                navigate("/login")
            } else {
                setError(res.data.message)
            }
        } catch (err) {
            setError("Something went wrong!")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        📚 Study Planner
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Account banao aur padhna shuru karo!
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 
                    text-red-400 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* Name */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm mb-1 block">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Rahul"
                        className="w-full bg-gray-800 text-white px-4 py-3 
                        rounded-lg border border-gray-700 focus:outline-none 
                        focus:border-blue-500"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="text-gray-400 text-sm mb-1 block">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@gmail.com"
                        className="w-full bg-gray-800 text-white px-4 py-3 
                        rounded-lg border border-gray-700 focus:outline-none 
                        focus:border-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="text-gray-400 text-sm mb-1 block">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-gray-800 text-white px-4 py-3 
                        rounded-lg border border-gray-700 focus:outline-none 
                        focus:border-blue-500"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                    font-semibold py-3 rounded-lg transition duration-200"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-400 mt-4">
                    Already account hai?{" "}
                    <Link to="/login"
                        className="text-blue-400 hover:underline">
                        Login karo
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register