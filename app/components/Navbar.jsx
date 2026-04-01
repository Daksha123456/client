"use client";
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useState,useEffect} from "react";
import {Home, UserPlus, Search, LayoutDashboard, LogOut, LogIn, Menu, X,Moon,Bell, Icon} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn]=useState(false); 
    const [isMenuOpen, setIsMenuOpen]=useState(false);

    const router = useRouter();

    //check token on mount
    useEffect(()=>{
        const token = localStorage.getItem('token');        
        setIsLoggedIn(!!token); // Set to true if token exists, false otherwise 
    },[])

    const handleLogout=()=>{
        localStorage.removeItem('token'); // Remove token from localStorage
        setIsLoggedIn(false); // Update login status
       // router.push('/login'); // Redirect to login page
    }

    const links=[
        {href:"/", label:"Home", icon:<Home size={18} />},
        {href:"/search", label:"Search", icon:<Search size={18} />},
        ...(isLoggedIn ? [
            {href:"/dashboard", label:"Dashboard", icon:<LayoutDashboard size={18} />},
            // {href:"/notifications", label:"Notifications", icon:<Bell size={18} />},
        ] : [])
    ];

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur-xl">
            <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                <Link href="/" className='text-2xl font-bold flex items-center gap-2 tracking-tight'>
                    DevHire
                </Link>

            <div className='hidden md:flex items-center gap-6'>
                {links.map((link)=>{
                    <Link key={link.href} href={link.href} className='flex items-center gap-1 text-sm font-medium hover:text-gray-300 transition-colors'>
                        {link.icon}
                        {link.label}

                        <Icon size={18}/>
                        {link.label}
                    </Link>
                })}

                <button className='p-2 rounded-xl hover:bg-white/10 transition'>
                    <Bell size={18}  />
                </button>

                <button className='p-2 rounded-xl hover:bg-white/10 transition'>
                    <Moon size={18}  />
                </button>

                {isLoggedIn ? (
                    <button onClick={handleLogout} className='flex items-center gap-2 bg-red-500 px-4 py-2 rounded-2xl hover:text-red-700 transition-colors'>
                        <LogOut size={18} />
                        Logout
                    </button>
                ) : (
                    <>
                        <Link href="/login" className='flex items-center gap-2 bg-green-500 px-4 py-2 rounded-2xl hover:text-green-700 transition-colors'>
                            <LogIn size={18} />
                                LogIn
                        </Link>

                        <Link href="/register">
                            <button className='flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-2xl hover:text-blue-700 transition-colors'>
                                 <UserPlus size={18} />
                                     Register
                             </button>
                        </Link>
                    </>
                  )}
            </div>

            <button className='md:hidden' onClick={()=>setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
        </div>
   
        <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto'   }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/10 backdrop-blur-xl overflow-hidden px-6 py-4 space-y-3"
                    >
                        {
                            links.map((link)=>{
                                const Icon=link.icon;
                                return(
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className='flex items-center gap-2'
                                    >
                                    <Icon size={18} />
                                    {link.label}
                                    </Link>
                                )
                            })
                        }
                    </motion.div>
                  )

                  }
        </AnimatePresence>
   </nav>
  )
};

