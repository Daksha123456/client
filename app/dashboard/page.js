"use client"

import { useEffect, useState } from "react"
import API from "../../services/api.js"
import { useRouter } from "next/navigation"

export default function dashBoardPage(){
    const [user,setUser] = useState(null);
    const router=useRouter();

    //protect route
    useEffect(()=>{
        const token=localStorage.getItem("token")

        if(!token){
            router.push("/login")
        }else{
            fetchUserProfile();
        }
    },[]);

    //fetch user profile
    const fetchUserProfile=async ()=>{
        try {
            const {data}=await API.get("users/profile");
            setUser(data);
        } catch (error) {
            console.log(error);
            router.push("/login")
            
        }
    }


    if(!user){
        return (
            <div className="flex justify-center items-center min-h-screen text-white">
                Loading Profile...
            </div>
        )}

        return(
            <div className="p-6 bg-gray-900 min-h-screen text-white">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-lg">
                    <h2 className="text-2xl font-semibold mb-4">Welcome, {user.name}!</h2>
                    <p className="text-gray-400 mt-2"> {user.bio}</p>

                   <div className="flex flex-wrap gap-2 mt-4">
                        {user.skills && user.skills.length > 0 && (
                            <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Skills:</h3>
                            <ul className="list-disc list-inside text-gray-300">
                                {user.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                            </div>
                        )}
                    </div>

                    //experience
                    <div className="mt-4">
                        {user.experience && user.experience.length > 0 && (
                            <>
                            <h3 className="text-lg font-semibold mb-2">Experience:</h3>
                            <ul className="list-disc list-inside text-gray-300">
                                {user.experience.map((exp, index) => (
                                    <li key={index}>{exp}</li>
                                ))}
                            </ul>
                            </>
                        )}

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
                    onClick={()=>router.push("/editProfile")}
                    className="mt-5 bg-green-500 py-2 px-4 rounded hover:bg-green-600 transition"
                    >
                        Edit Profile
                    </button>

                    <p className="text-gray-300 mb-2"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>  

                </div>
            </div>
        )
}