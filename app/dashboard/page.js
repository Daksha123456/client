"use client"

import { useEffect, useState } from "react"
import API from "../../services/api.js"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function dashBoardPage(){
    const [user,setUser] = useState(null);
    const router=useRouter();

     //fetch user profile

    //protect route
    useEffect(()=>{
        const fetchUserProfile=async ()=>{
        try {
            const response=await API.get("/users/profile");
            console.log("dashboard full data:",response);
            console.log("profile data",response.data)

            if(response.data){
                console.log("User data found in response:", response.data.user);
            setUser(response.data);

            } else {
                console.log("User data not found in response:", response.data);
            }
        } catch (error) {
            console.log("dashboard error",error.response?.data || error.message);
            router.push("/login")
        }}
        fetchUserProfile();
    },[]);

       const logoutHandler=()=>{
        localStorage.removeItem("token");
        router.push("/login");  
    }

    if(!user){
        return (
            <div className="flex justify-center items-center min-h-screen text-white text-xl font-semibold">
                Loading Dashboard...
            </div>
        )}

        return(
            <div className="p-6 bg-linear-to-br from-slate-900 via-indigo-900 to-slate-800 min-h-screen text-white">
                //Navbar
                <div className="flex justify-between items-center px-10 py-6 border-b border-white/10 mb-4">
                    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                    <button
                        onClick={logoutHandler}
                        className="bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>

                //Main Card
            <div className="max-w-4xl mx-auto mt-10">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
                    <h2 className="text-2xl font-bold mb-6">Welcome, {user.name}!</h2>
                
                   <div className="space-y-4 text-lg">
                       <p><strong>Email:</strong> {user.email}</p>

                       <p><strong>Bio:</strong> {user.bio || "No bio added"}</p>

                       <p><strong>Skills:</strong> {user.skills || "No Skills added"}</p>

                       <p><strong>Experience:</strong> {user.experience || "No experience added"}</p>

                       <p><strong>GitHub:</strong> {user.github || "No GitHub profile added"}</p>

                       <p><strong>LinkedIn:</strong> {user.linkedin || "No LinkedIn profile added"}</p>

                       <p><strong>Portfolio:</strong> {user.portfolio || "No portfolio added"}</p>

                    </div>

                    //links
                    {user.github && (
                            <a
                            href={user.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 mt-2 hover:underline"
                            >
                            </a>
                    )}

                    //Edit profile button
                    <button
                    onClick={()=>router.push("/dashboard/edit")}
                    className="mt-5 bg-green-500 py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
            </div>
        )
}