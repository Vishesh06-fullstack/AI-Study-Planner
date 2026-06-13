// frontend/src/pages/Login.jsx
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            )

            if (res.data.token) {
                login(res.data.user, res.data.token)
                navigate("/dashboard")
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
                        Welcome back! Login to continue
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 
                    text-red-400 px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

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
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white 
                    font-semibold py-3 rounded-lg transition duration-200"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Register Link */}
                <p className="text-center text-gray-400 mt-4">
                    Account nahi hai?{" "}
                    <Link to="/register"
                        className="text-blue-400 hover:underline">
                        Register karo
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login