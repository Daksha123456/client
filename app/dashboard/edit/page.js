"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api.js";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
    const [form, setForm] = useState({
        bio:"",
        skills:"",
        experience:"",
        github:"",
        linkedin:""
    });

    const [loading, setLoading] = useState(false);
    const router=useRouter();

    //fetch existing profile data
    useEffect(()=>{
        const fetchProfile=async ()=>{
            try {
                const {data}=await API.get("/users/profile");
                setForm({
                    bio:data.bio || "",
                    skills:data.skills ? data.skills.join(",") : "",
                    experience:data.experience || "",
                    github:data.github || "",
                    linkedin:data.linkedin || ""
                })
            } catch (error) {
                router.push("/login")
            }
        }
        fetchProfile();
    }, [])
    
    //handle input change
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    //handle submit
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);

            const updatedData={
                ...form,
                skills:form.skills.split(",").map(skill=>skill.trim()),
            };
            await API.put("/users/profile",updatedData);
            router.push("/dashboard");
        } catch (error) {
            console.log(error);            
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="justify-center flex items-center min-h-screen bg-gray-900 text-white">

            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl w-full max-w-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-5">
                    Edit Profile
                </h1>

                //bio
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Bio</label>     
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about yourself..."
                    />
                </div>
                //skills
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Skills (comma separated)</label>        
                    <input
                        type="text"
                        name="skills"
                        value={form.skills}
                        onChange={handleChange}
                        className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your skills..."
                    />
                </div>
                //experience
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Experience</label>                                              
                    <textarea           
                        name="experience"           
                        value={form.experience}
                        onChange={handleChange}
                        className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about your experience..."
                    />
                </div>
                //github
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">GitHub</label>        
                    <input
                        type="text"
                        name="github"
                        value={form.github}
                        onChange={handleChange}
                        className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your GitHub username..."
                    />
                </div>
                //linkedin
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">LinkedIn</label>        
                    <input
                        type="text"
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your LinkedIn username..."
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>   
            </form>

        </div>
    )

}   