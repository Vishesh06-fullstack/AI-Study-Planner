// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import SubjectDetail from "./pages/SubjectDetails"

// Protected Route
const ProtectedRoute = ({ children }) => {
    const { token } = useAuth()
    if (!token) return <Navigate to="/login" />
    return children
}

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/subject/:id" element={
                        <ProtectedRoute>
                            <SubjectDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App