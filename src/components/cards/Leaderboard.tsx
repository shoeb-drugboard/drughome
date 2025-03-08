import React, { JSX } from 'react';
import { Card, CardBody, CardHeader, Avatar, Chip, Divider, Button } from "@heroui/react";
import { Flame, Trophy, Medal, Crown, Star, Maximize, Minimize } from "lucide-react";
import { motion } from "framer-motion";
import cn from '@/utils/cn';

interface LeaderboardProps {
    className?: string;
    cardId: string;
    maximizedCard: string | null;
    toggleMaximize: (cardId: string) => void;
}

interface LeaderboardUser {
    id: number;
    name: string;
    avatar: string;
    xp: number;
    rank: number;
    isCurrentUser?: boolean;
}

const Leaderboard = ({ className, cardId, maximizedCard, toggleMaximize }: LeaderboardProps) => {
    const isMaximized = maximizedCard === cardId;

    const leaderboardData: LeaderboardUser[] = [
        { id: 1, name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", xp: 9850, rank: 1 },
        { id: 2, name: "Jamie Smith", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e", xp: 9340, rank: 2 },
        { id: 3, name: "Taylor Brown", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f", xp: 8720, rank: 3 },
        { id: 4, name: "Jordan Lee", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g", xp: 7950, rank: 4 },
        { id: 5, name: "Casey Wong", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h", xp: 7320, rank: 5 },
        { id: 6, name: "Riley Cooper", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704i", xp: 6800, rank: 6 },
        { id: 7, name: "Avery Garcia", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704j", xp: 6100, rank: 7 },
        { id: 8, name: "Morgan Wright", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704k", xp: 5780, rank: 8 },
        { id: 9, name: "Dakota Kim", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704l", xp: 5200, rank: 9 },
        { id: 10, name: "Hayden Patel", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704m", xp: 4800, rank: 10 },
        { id: 12, name: "You", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704z", xp: 4320, rank: 12, isCurrentUser: true },
    ];
    const currentUser = leaderboardData.find(user => user.isCurrentUser);
    const otherUsers = leaderboardData.filter(user => !user.isCurrentUser);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        show: { x: 0, opacity: 1 }
    };

    // Function to get medal icon based on rank
    const getMedalIcon = (rank: number): JSX.Element => {
        switch (rank) {
            case 1:
                return <Crown className="text-yellow-500" />;
            case 2:
                return <Medal className="text-gray-400" />;
            case 3:
                return <Medal className="text-amber-700" />;
            default:
                return <Star className="text-purple-400" />;
        }
    };

    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return "bg-yellow-400 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100";
            case 2:
                return "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100";
            case 3:
                return "bg-amber-300 dark:bg-amber-700 text-amber-900 dark:text-amber-100";
            default:
                return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
        }
    };

    return (
        <Card className={cn("w-full mx-auto shadow-xl relative bg-white/60 backdrop-blur-xl", className)}>
            <CardHeader className="flex justify-center pb-0">
                <div className="flex flex-col items-center">
                    <div className='flex items-center justify-center w-full'>
                        <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                        <h2 className="text-2xl font-bold text-center pl-2">XP Leaderboard</h2>
                    </div>
                    <p className="text-sm text-default-500">Top performers this week</p>
                </div>
            </CardHeader>

            <CardBody>
                {/* Scrollable leaderboard */}
                <div
                    className="h-auto overflow-y-auto pr-2 -mr-2 scroll-smooth 
                    [&::-webkit-scrollbar]:w-1 
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-black
                    [&::-webkit-scrollbar-thumb]:rounded-full"
                >
                    <motion.div
                        className="flex flex-col h-full gap-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {otherUsers.map((user) => (
                            <motion.div
                                key={user.id}
                                variants={itemVariants}
                                className={cn(
                                    "flex items-center p-3 rounded-lg",
                                    user.rank <= 3 ? "bg-gradient-to-br from-gray-50 to-black/20 dark:from-gray-800 dark:to-gray-900" : " bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
                                )}
                            >
                                <div className={cn(
                                    "flex items-center justify-center h-8 w-8 rounded-full mr-3",
                                    getRankStyle(user.rank)
                                )}>
                                    {user.rank}
                                </div>
                                <div className="relative">
                                    <Avatar
                                        src={user.avatar}
                                        className={cn(
                                            "h-12 w-12",
                                            user.rank === 1 ? "border-2 border-yellow-500" :
                                                user.rank === 2 ? "border-2 border-gray-400" :
                                                    user.rank === 3 ? "border-2 border-amber-700" : ""
                                        )}
                                    />
                                    {user.rank <= 3 && (
                                        <Chip
                                            color={user.rank === 1 ? "warning" : user.rank === 2 ? "secondary" : "primary"}
                                            variant="bordered">
                                            {getMedalIcon(user.rank)}
                                        </Chip>
                                    )}
                                </div>
                                <div className="ml-3 flex-grow">
                                    <p className="font-semibold">{user.name}</p>
                                    <div className="flex items-center gap-1">
                                        {user.rank === 1 && (
                                            <>
                                                <Flame className="h-4 w-4 text-orange-500" />
                                                <p className="text-xs text-default-500">On fire! +7 days</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <Chip
                                    color={user.rank === 1 ? "warning" : user.rank === 2 ? "secondary" : user.rank === 3 ? "primary" : "default"}
                                    variant={user.rank <= 3 ? "shadow" : "flat"}
                                >
                                    {user.xp} XP
                                </Chip>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <Divider className="my-1" />

                {/* Current User */}
                {currentUser && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className=""
                    >
                        <h3 className="text-sm text-default-500 mb-2">Your Position</h3>
                        <Card className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                            <CardBody>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                                            {currentUser.rank}
                                        </div>
                                        <Avatar src={currentUser.avatar} className="h-10 w-10" />
                                        <div>
                                            <p className="font-semibold">{currentUser.name}</p>
                                            <div className="flex items-center gap-1">
                                                <Flame className="h-4 w-4 text-orange-500" />
                                                <p className="text-xs text-default-500">On fire! +5 days</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Chip color="primary" variant="shadow">
                                        {currentUser.xp} XP
                                    </Chip>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                )}
            </CardBody>

            {/* Maximize/Minimize Button */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                className='absolute top-2 right-2 flex bg-transparent gap-0 translate-x-0 -translate-y-0 z-10'
            >
                <Button className='bg-transparent p-0' onClick={() => toggleMaximize(cardId)}>
                    {isMaximized ?
                        <Minimize size={16} className="text-gray-500 hover:text-gray-700" /> :
                        <Maximize size={16} className="text-gray-500 hover:text-gray-700" />
                    }
                </Button>
            </motion.div>
        </Card>
    );
};

export default Leaderboard;