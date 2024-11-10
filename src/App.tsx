import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages'
import ToDoFormPage from './pages/todos/TodoEdit'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ToDoAdd from './pages/todos/TodoAdd'

function App() {
  return (
    <Router>
      <div className="h-screen text-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<ToDoAdd />} />
          <Route path="/edit/:todoId" element={<ToDoFormPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
