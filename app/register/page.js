"use client";

import { useState } from "react";
import API from "../../services/api.js"
import { useRouter } from "next/navigation";
import Link from "next/link"

export default function RegisterPage() {
    const [form, setForm] = useState({
        name:"",
        email: "",
        password: "",
        confirmPassword:"",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //handle input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
        
    const handleSubmit = async (e) => {
        e.preventDefault();

        //password check
         if(form.password!==form.confirmPassword){
                setError("ConfirmPassword should be same as password");
                return; // stop execution
            }

        try {
            setLoading(true); //start loading
            setError("");

            const {data}=await API.post("/auth/register", form);
            //optional: auto login after register
            localStorage.setItem("token", data.token);
            //redirect
            router.push("/dashboard");
            
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
        }finally{
            setLoading(false); //stop loading
        }
    }

return(

    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 to-black text-white">
    
        <form 
        onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        
            <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
            {error && (<p className="text-red-400 text-sm mb-3 text-center">{error}</p>)}

            <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full mb-4 p-3 rounded bg-gray-800 outline-none transition"
            />

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

             <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="ConfirmPassword"
            className="w-full mb-4 p-3 rounded bg-gray-800 outline-none transition"
            />

            <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 py-3 rounded-2xl hover:bg-blue-600 text-white transition"
            >
               {loading? "Creating..." : "Create Account"}
            </button>

            <p className="text-sm text-gray-400 mt-4 text-center">
                Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
        </form>
    </div>
)}