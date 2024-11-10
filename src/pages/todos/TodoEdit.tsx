import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';
import { useModal } from '../../hooks/useModalStore';

const ToDoFormPage = () => {
  const { onOpen } = useModal()
  const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

  const { pathname } = useLocation();
  const { todoId = 0 } = useParams();

  const isAdding = pathname.startsWith("/add");

  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [priorityLevel, setPriorityLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [date, setDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdding && todoId) {
      const fetchTodo = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/todos/${todoId}`);
          const todo = response.data.data;

          setText(todo.text);
          setCategory(todo.category);
          setPriorityLevel(todo.priority_level);
          setIsCompleted(todo.completed);

          const formattedDate = todo.date.split("T")[0];
          setDate(formattedDate);
        } catch (error) {
          setError("Failed to fetch todo");
          console.error(error)
        } finally {
          setLoading(false);
        }
      };
      fetchTodo();
    }
  }, [isAdding, todoId]);

  const handleToggleCompleted = () => setIsCompleted(!isCompleted);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col justify-center h-screen max-w-sm mx-auto md:max-w-md">
      <h1 className="mb-4 text-2xl font-bold">{!isAdding ? "Edit To-Do" : "Add a New To-Do"}</h1>
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

        <div className="flex items-center justify-between">
          <label htmlFor="completed" className="font-bold">Completed</label>
          <input
            id="completed"
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleCompleted}
            className="p-2 border rounded"
          />
        </div>


        <button type="button" onClick={() => onOpen("update", {
          todo: {
            id: Number(todoId),
            text,
            category,
            date,
            priority_level: priorityLevel,
            completed: isCompleted
          }
        })} className="p-2 mt-2 text-white bg-purple-500 rounded hover:bg-purple-700">
          {isAdding ? "Add To-Do" : "Update To-Do"}
        </button>

        <button
          type="button"
          onClick={() => onOpen("delete", {
            todo: {
              id: Number(todoId),
              text,
              category,
              date,
              priority_level: priorityLevel,
              completed: isCompleted
            }
          })}
          className="p-2 mt-2 text-white bg-red-700 rounded hover:bg-red-900"
        >
          Delete To-Do
        </button>

        <button type="button" onClick={() => onOpen("cancel")} className="p-2 mt-2 text-white bg-red-500 rounded hover:bg-red-700">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ToDoFormPage;
