import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import TodoList from '../components/TodoList'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/todos', {
        params: {
          keyword,
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          priority_level: selectedPriority !== 'all' ? selectedPriority : undefined,
        }
      });
      setTodos(response.data.data);
    } catch (error) {
      setTimeout(() => {
        console.error(error);
        setError('Failed to fetch todos');
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get('/todos/categories');

        setCategories(response.data.data);
      } catch (error) {
        setTimeout(() => {
          console.error(error);
          setError('Failed to fetch categories');
        }, 5000);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
    fetchCategories();
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("token")
    window.location.href = '/login'
  }

  const handleSearch = () => {
    fetchTodos(); // Trigger fetch with current search parameters
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full md:max-w-[80%]">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">To-Do-List App</h1>
          <div className="flex items-center gap-2">
            <a href="/add" className="p-2 mt-4 text-white bg-pink-500 rounded hover:bg-pink-700">Add To-Do</a>
            <button onClick={handleSignout} type="button" className="p-2 mt-4 text-white bg-red-500 rounded hover:bg-red-700">Sign Out</button>
          </div>
        </div>
        <SearchBar
          categories={categories}
          keyword={keyword}
          setKeyword={setKeyword}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          handleSearch={handleSearch}
        />
        {todos === null ? <p className="mt-4 text-center">No todos found</p> : (
          <TodoList todos={todos} setTodos={setTodos} />
        )}
      </div>
    </div>
  )
}

export default Home