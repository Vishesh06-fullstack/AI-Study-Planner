// frontend/src/pages/SubjectDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const SubjectDetail = () => {
  const [tasks, setTasks] = useState([]);
  const [subject, setSubject] = useState(null);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchSubject = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subjects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const found = res.data.subjects.find((s) => s._id === id);
      setSubject(found);
    } catch (err) {
      console.log(err);
    }
  };

  // Tasks Fetch Karo
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  // Task Add Karo
  const addTask = async () => {
    if (!title) return;
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          priority,
          subjectId: id,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTitle("");
      setPriority("Medium");
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // Task Complete Toggle
  const toggleTask = async (taskId, completed) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { completed: !completed },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Task Delete Karo
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Progress Calculate Karo
  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (tasks.filter((t) => t.completed).length / tasks.length) * 100,
        );


  useEffect(() => {
    fetchSubject();
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div
          className="bg-gray-900 rounded-2xl p-6 mb-8 
                border border-gray-800"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Progress</h2>
            <span className="text-blue-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm mt-3">
            {tasks.filter((t) => t.completed).length} / {tasks.length} topics
            complete
          </p>
        </div>

        {/* Tasks Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 
                        px-4 py-2 rounded-lg text-sm transition"
          >
            {showForm ? "Cancel" : "+ Add Task"}
          </button>
        </div>

        {/* Add Task Form */}
        {showForm && (
          <div
            className="bg-gray-900 rounded-2xl p-6 mb-6 
                    border border-gray-800"
          >
            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title (e.g. Calculus)"
                className="flex-1 bg-gray-800 text-white 
                                px-4 py-3 rounded-lg border border-gray-700 
                                focus:outline-none focus:border-blue-500"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-gray-800 text-white px-4 py-3 
                                rounded-lg border border-gray-700 
                                focus:outline-none focus:border-blue-500"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
              <button
                onClick={addTask}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 
                                px-6 py-3 rounded-lg transition"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-5xl mb-4">📝</p>
            <p>Koi task nahi hai abhi!</p>
            <p className="text-sm mt-2">"Add Task" dabao aur shuru karo!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectDetail;
