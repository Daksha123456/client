"use client"

import { useEffect, useState } from "react"
import API from "../../services/api"
import { useRouter } from "next/navigation"

export default function dashboardPage(){
    const [user,setUser] = useState(null);
    const router=useRouter();

    //protect route
    useEffect(()=>{
        const token=localStorage.getItem("token")

        if(!token){
            router.push("/login")
        }else{
            fetchProfile();
        }
    },[]);

    //fetch user profile
    const fetchUserProfile=async ()=>{

    }
}