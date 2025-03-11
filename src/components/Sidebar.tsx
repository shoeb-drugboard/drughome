"use client";
import React, { useState, useEffect, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion'
import { Tooltip } from '@heroui/react'
import { DoorClosed, DoorOpen, HomeIcon, LayoutDashboardIcon, MapPin, MessagesSquareIcon } from 'lucide-react';

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState('/dashboard'); // Set dashboard as default

    const navItems = useMemo(() => [
        { icon: HomeIcon, path: '/home', title: 'Home' },
        { icon: MessagesSquareIcon, path: '/messages', title: 'Messages' },
        { icon: LayoutDashboardIcon, path: '/', title: 'Dashboard' },
        { icon: DoorOpen, path: '/room', title: 'Room' },
        { icon: MapPin, path: '/location', title: 'Location' },
        { icon: DoorClosed, path: '/exit', title: 'Exit' },
    ], []);

    useEffect(() => {
        // Check if current path is in navItems, otherwise keep dashboard as active
        const isValidPath = navItems.some(item => item.path === pathname);
        if (isValidPath) {
            setActiveLink(pathname);
        }
    }, [pathname, navItems]);

    const handleNavigation = (path: string) => {
        setActiveLink(path);
        router.push(path);
    };

    return (
        <motion.div
            className='bg-white/80 backdrop-blur-xl flex justify-center items-center p-3 rounded-full w-[4vw] h-max border border-black/20 shadow-md'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="h-full py-4 flex flex-col items-center justify-evenly text-black gap-4">
                {navItems.map((item) => (
                    <Tooltip key={item.path} content={item.title} placement="right">
                        <motion.div
                            onClick={() => handleNavigation(item.path)}
                            className={`cursor-pointer p-2 rounded-full ${activeLink === item.path ? 'bg-gradient-to-r from-pink-200 to-purple-200' : ''}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={{
                                    scale: activeLink === item.path ? 1.1 : 1
                                }}
                                transition={{ duration: 0.2 }}
                                className={activeLink === item.path ? 'bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 p-1' : 'text-black'}
                            >
                                <item.icon size={24} />
                            </motion.div>
                        </motion.div>
                    </Tooltip>
                ))}
            </div>
        </motion.div>
    );
}

export default Sidebar;