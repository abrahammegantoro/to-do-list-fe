import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            const response = await api.post('/login', {
                username: username,
                password: password
            });

            const data = response.data.data
            localStorage.setItem('token', data.token);
            window.location.href = "/";
        } catch (error) {
            console.error(error);
        } finally {
            setUsername('');
            setPassword('');
        }
    }

    return (
        <div className="flex items-center justify-center h-full">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm gap-2 p-6 bg-white border rounded-lg shadow-lg md:max-w-lg">
                <h1 className="text-3xl font-bold">Login</h1>
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
                <button type="submit" className="p-2 mt-4 text-white bg-pink-500 rounded hover:bg-pink-700">Login</button>
                <p>Doesn't have account? <a href='/register' className="text-purple-500 underline hover:text-purple-700">Register</a></p>
            </form>
        </div>
    )
}

export default Login;