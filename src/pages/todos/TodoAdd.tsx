import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useModal } from '../../hooks/useModalStore';
import { useNavigate } from 'react-router-dom';

const ToDoAdd = () => {
    const { onOpen } = useModal()

    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const [priorityLevel, setPriorityLevel] = useState<'low' | 'medium' | 'high'>('low');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
    
    const handleSubmit = async () => {
        try {
            const inputDate = new Date(date)

            await api.post('/todos', {
                text,
                category,
                date: inputDate,
                priority_level: priorityLevel,
                completed: false
            });
        } catch (error) {
            console.error(error);
        } finally {
            setText('');
            setCategory('');
            setPriorityLevel('low');
            setDate('');
            window.location.href = '/';
        }
    }

    return (
        <div className="flex flex-col justify-center h-screen max-w-sm mx-auto md:max-w-md">
            <h1 className="mb-4 text-2xl font-bold">Add a New To-Do</h1>
            <form className="flex flex-col p-4 space-y-2 border-2">
                <label htmlFor="task" className="font-bold text-left">Task</label>
                <input
                    id="task"
                    type="text"
                    placeholder="Task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="p-2 border rounded"
                />

                <label htmlFor="category" className="font-bold text-left">Category</label>
                <input
                    id="category"
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border rounded"
                />

                <label htmlFor="date" className="font-bold text-left">Due Date</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="p-2 border rounded"
                />

                <label htmlFor="priority" className="font-bold text-left">Priority Level</label>
                <select
                    id="priority"
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(e.target.value as 'low' | 'medium' | 'high')}
                    className="p-2 border rounded"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="button" onClick={() => handleSubmit()} className="p-2 mt-2 text-white bg-purple-500 rounded hover:bg-purple-700">
                    Add To-Do
                </button>

                <button type="button" onClick={() => onOpen("cancel")} className="p-2 mt-2 text-white bg-red-500 rounded hover:bg-red-700">
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ToDoAdd;
