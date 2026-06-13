// frontend/src/components/TaskCard.jsx

const TaskCard = ({ task, onToggle, onDelete }) => {

    // Priority Color
    const priorityColor = (priority) => {
        if (priority === "High") 
            return "text-red-400 bg-red-400/10 border-red-400/20"
        if (priority === "Medium") 
            return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
        return "text-green-400 bg-green-400/10 border-green-400/20"
    }

    // Priority Emoji
    const priorityEmoji = (priority) => {
        if (priority === "High") return "🔴"
        if (priority === "Medium") return "🟡"
        return "🟢"
    }

    return (
        <div className={`bg-gray-900 rounded-2xl p-5 border transition
            ${task.completed
                ? 'border-green-500/30 opacity-60'
                : 'border-gray-800 hover:border-gray-700'
            }`}
        >
            <div className="flex justify-between items-center">

                {/* Left Side */}
                <div className="flex items-center gap-4">

                    {/* Checkbox */}
                    <button
                        onClick={() => onToggle(task._id, task.completed)}
                        className={`w-6 h-6 rounded-full border-2 
                        flex items-center justify-center transition
                        ${task.completed
                                ? 'bg-green-500 border-green-500'
                                : 'border-gray-600 hover:border-blue-500'
                            }`}
                    >
                        {task.completed && (
                            <span className="text-white text-xs">✓</span>
                        )}
                    </button>

                    {/* Title */}
                    <span className={`font-medium
                        ${task.completed
                            ? 'line-through text-gray-500'
                            : 'text-white'
                        }`}
                    >
                        {task.title}
                    </span>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">

                    {/* Priority Badge */}
                    <span className={`text-xs px-3 py-1 rounded-full 
                    font-medium border ${priorityColor(task.priority)}`}>
                        {priorityEmoji(task.priority)} {task.priority}
                    </span>

                    {/* Delete Button */}
                    <button
                        onClick={() => onDelete(task._id)}
                        className="text-gray-500 hover:text-red-400 
                        transition text-lg"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard