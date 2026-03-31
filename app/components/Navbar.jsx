"use client";
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState,useEffect} from "react";
import {Home, UserPlus, Search, LayoutDashboard, LogOut} from 'lucide-react';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn]=useState(false); 
    const router = useRouter();

    //check token on mount
    useEffect(()=>{
        const token = localStorage.getItem('token');
        
        setIsLoggedIn(!!token); // Set to true if token exists, false otherwise 
    },[])

    const handleLogout=()=>{
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update login status
        router.push('/login'); // Redirect to login page
    }

    return (
        <nav className="bg-gray-900 text-white border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className='text-2xl font-bold tracking-tight'>Home</Link>
            </div>
            
            //links for logged in users
            <div className='flex items-center gap-5 text-sm md:text-base'>
                <Link href="/" className='hover:text-gray-400'>
                    <Home size={18} />
                    Home
                </Link>
                <Link href="/search" className='hover:text-gray-400'>
                    <Search size={18} />
                    Search
                </Link>
                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard" className='flex items-center gap-2 hover:text-gray-400 transition'>
                                <LayoutDashboard size={18} />
                                Dashboard
                            </Link>
                             <button onClick={handleLogout} className='flex items-center gap-2 hover:text-gray-400'>
                                <LogOut size={18} />
                                Logout
                            </button>
                        </>
                    ):(
                        <>
                            <Link href="/register" className='flex items-center gap-2 hover:text-gray-400'>
                                <UserPlus size={18} />
                                Register
                            </Link>

                             <Link href="/login" className='flex items-center gap-2 hover:text-gray-400'>
                                <Login size={18} />
                                Login
                            </Link>
                        </>         
                    )

                    }
               
            </div>
        </nav>

    )
};

