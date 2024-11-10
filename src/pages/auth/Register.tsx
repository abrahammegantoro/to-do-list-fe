import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/register', {
                username: username,
                password: password,
                name: name
            });

            const data = response.data.data

            localStorage.setItem('token', data.token);
            window.location.href = '/';
        } catch (error) {
            console.error(error);
        } finally {
            setUsername('');
            setPassword('');
            setName('');
        }
    }

    return (
        <div className="flex items-center justify-center h-full">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm gap-2 p-6 bg-white border rounded-lg shadow-lg md:max-w-lg">
                <h1 className="text-3xl font-bold">Register</h1>
                <label htmlFor="name" className="font-bold text-left">Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                />
                <label htmlFor="username" className="font-bold text-left">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 border rounded"
                />
                <label htmlFor="password" className="font-bold text-left">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded"
                />
                <button type="submit" className="p-2 mt-4 text-white bg-pink-500 rounded hover:bg-pink-700">Register</button>
                <p>Already have account? <a href='/login' className="text-purple-500 underline hover:text-purple-700">Login</a></p>
            </form>
        </div>
    )
}

export default Register;