// frontend/src/components/Navbar.jsx
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                
                {/* Logo */}
                <h1
                    onClick={() => navigate("/dashboard")}
                    className="text-xl font-bold text-white 
                    cursor-pointer hover:text-blue-400 transition"
                >
                    📚 Study Planner
                </h1>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">
                        👋 Hey, {user?.name}!
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 
                        px-4 py-2 rounded-lg text-sm transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar