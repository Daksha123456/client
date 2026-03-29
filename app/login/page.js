"Use client";
import Link from "next/link"

import { useState } from "react";
import API from "../../services/api"
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data}=await API.post("/auth/login", form);
            //store token
            localStorage.setItem("token", data.token);
            //redirect
            router.push("/dashboard");
            
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
        }
    }

return(

    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
    
        <form 
        onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            {error && (<p className="text-red-400 text-sm mb-3 text-center">{error}</p>)}

            <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mb-4 p-3 rounded bg-gray-800 outline-none transition"
            />

            <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mb-4 p-3 rounded bg-gray-800 outline-none transition"
            />

            <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded-2xl hover:bg-blue-600 text-white transition"
            >
                Login
            </button>

            <p className="text-sm text-gray-400 mt-4 text-center">
                Don't have an account? <Link href="/register" className="text-blue-500 hover:underline">Register</Link>
            </p>
        </form>
    </div>
)}