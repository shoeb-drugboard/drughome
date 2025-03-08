import React from 'react'
// import Image from 'next/image'
import cn from '@/utils/cn';
import { Maximize, Minimize, Settings, Twitter, Linkedin, Github, Mail, CalendarDays, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/button';
import { Card, CardFooter } from '@heroui/card';
import { Avatar, Chip } from '@heroui/react';

interface ProfileCardProps {
    className?: string;
    name?: string | "John Doe";
    role?: string | "Software Engineer";
    dateJoined?: string | "January 2023";
    location?: string;
    bio?: string;
    skills?: string[];
    stats?: {
        followers?: number;
        following?: number;
        projects?: number;
    };
    socialMedia?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        email?: string;
    };
    detailed?: boolean;
    cardId: string;
    maximizedCard: string | null;
    toggleMaximize: (cardId: string) => void;
}

const UserProfile: React.FC<ProfileCardProps> = ({
    className = "default-class",
    name = "Shoeb Uddin",
    role = "Founding Frontend Engineer",
    dateJoined = "January 2025",
    location = "Hyderabad, Telangana",
    bio = "Passionate software engineer focused on building user-friendly applications with a focus on functionality and performance.",
    skills = ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "Framer Motion", "Next.js", "Vercel"],
    stats = {
        followers: 1250,
        following: 350,
        projects: 45
    },
    socialMedia = {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "mailto:example@example.com"
    },
    cardId,
    maximizedCard,
    toggleMaximize,
}) => {
    const isMaximized = maximizedCard === cardId;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn('shadow-md h-full font-poppins relative')}
        >
            <Card className={cn(`w-full pb-4 overflow-hidden`, className)}>
                {/* Header background */}
                <div className="relative w-full bg-gradient-to-r from-blue-500 to-purple-600 h-20">
                    {/* Toggle maximize button */}
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className='absolute top-2 right-2'
                    >
                        <Button className='bg-white/30 hover:bg-white/50 p-1 rounded-full' onPress={() => toggleMaximize(cardId)}>
                            {isMaximized ?
                                <Minimize size={16} className="text-white" /> :
                                <Maximize size={16} className="text-white" />
                            }
                        </Button>
                    </motion.div>
                </div>

                {/* Avatar - positioned to overlap the header */}
                <div className="flex justify-center -mt-10 mb-2">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className='rounded-full overflow-hidden border-4 border-white shadow-md'
                    >
                        <Avatar size="lg" className="rounded-full" />
                    </motion.div>
                </div>

                {/* User info section */}
                <div className="text-center px-4">
                    <h1 className='font-semibold text-2xl'>{name}</h1>
                    <p className='text-slate-400 font-semibold text-xs uppercase'>{role}</p>

                    {/* User details row */}
                    <div className="flex justify-center flex-wrap gap-3 mt-2">
                        <div className="flex items-center text-xs text-slate-500">
                            <MapPin size={12} className="mr-1" />
                            <span>{location}</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-500">
                            <CalendarDays size={12} className="mr-1" />
                            <span>Joined {dateJoined}</span>
                        </div>
                    </div>
                </div>

                {/* Bio section - only show when maximized */}
                {isMaximized && (
                    <div className="px-6 mt-3">
                        <p className="text-sm text-slate-600 text-center">{bio}</p>
                    </div>
                )}

                {/* Stats section */}
                <div className="flex justify-center gap-6 mt-3 px-4">
                    <div className="text-center">
                        <p className="font-semibold">{(stats.followers ?? 0).toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">{(stats.following ?? 0).toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Following</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold">{stats.projects}</p>
                        <p className="text-xs text-slate-500">Projects</p>
                    </div>
                </div>

                {/* Skills section - only show when maximized */}
                {isMaximized && (
                    <div className="px-4 mt-8">
                        <div className="flex flex-wrap justify-start gap-2 items-center">
                            {skills.map((skill, index) => (
                                <Chip key={index} className="text-sm border-yellow-500 text-slate-50 bg-gradient-to-br from-red-400 to-purple-500" color='warning' variant='dot' >
                                    {skill}
                                </Chip>
                            ))}
                        </div>
                    </div>
                )}

                {/* Social Media Links */}
                <CardFooter className="flex justify-center gap-3 mt-4">
                    <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                        <motion.div whileHover={{ scale: 1.2 }} className="p-1.5 rounded-full bg-blue-50">
                            <Twitter size={15} className="text-blue-400" />
                        </motion.div>
                    </a>
                    <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                        <motion.div whileHover={{ scale: 1.2 }} className="p-1.5 rounded-full bg-blue-50">
                            <Linkedin size={15} className="text-blue-700" />
                        </motion.div>
                    </a>
                    <a href={socialMedia.github} target="_blank" rel="noopener noreferrer">
                        <motion.div whileHover={{ scale: 1.2 }} className="p-1.5 rounded-full bg-purple-50">
                            <Github size={15} className="text-purple-700" />
                        </motion.div>
                    </a>
                    <a href={socialMedia.email} target="_blank" rel="noopener noreferrer">
                        <motion.div whileHover={{ scale: 1.2 }} className="p-1.5 rounded-full bg-rose-50">
                            <Mail size={15} className="text-rose-500" />
                        </motion.div>
                    </a>
                </CardFooter>

                {/* Settings button */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='absolute bottom-2 right-2'
                >
                    <Button className='bg-transparent p-0 hover:bg-slate-100 rounded-full w-7 h-7 flex items-center justify-center'>
                        <Settings size={14} className="text-slate-400 hover:text-slate-600" />
                    </Button>
                </motion.div>
            </Card>
        </motion.div>
    )
}

export default UserProfile