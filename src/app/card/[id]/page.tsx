"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Minimize } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { cards } from '@/context/cardData';
import { SkeletonLoader } from "@/components/SkeletonLoader";

// Custom class mappings for different card components in detail view
const getDetailedComponentClass = (id: number): string => {
    switch (id) {
        case 1: // UserProfile
            return 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-100 w-auto md:w-3/4 lg:w-1/2 mx-auto';
        case 2:
            return 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-100 w-full md:w-3/4 lg:w-1/2 mx-auto';
        case 3:
            return 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-100 w-full md:w-3/4 lg:w-1/2 mx-auto';
        case 4:
            return 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-100 w-full md:w-3/4 lg:w-1/2 mx-auto';
        case 5:
            return 'bg-gradient-to-br from-purple-50 to-violet-100 border-purple-100 w-full md:w-3/4 lg:w-1/2 mx-auto';
        case 6:
            return 'bg-gradient-to-br from-cyan-50 to-sky-100 border-cyan-100 w-full md:w-3/4 lg:w-1/2 mx-auto';
        default:
            return 'w-full md:w-3/4 lg:w-1/2 mx-auto';
    }
};

export default function CardDetail() {
    const { id } = useParams();
    const [isMinimizing, setIsMinimizing] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);

    const router = useRouter();
    const card = cards.find(c => c.id === Number(id));

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
            setTimeout(() => {
                setIsContentVisible(true);
            }, 300);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    if (!card) return <div>Card not found</div>;

    const handleMinimize = () => {
        setIsContentVisible(false);
        setTimeout(() => {
            setIsMinimizing(true);
        }, 500);
    };

    const handleAnimationComplete = () => {
        if (isMinimizing) {
            setTimeout(() => {
                router.push('/');
            }, 200);
        }
    };

    const cardVariants = {
        initial: {
            opacity: 1,
            scale: 1,
            borderRadius: "0.5rem"
        },
        maximized: {
            opacity: 1,
            scale: 1,
            width: "100%",
            height: "100%",
            x: 0,
            borderRadius: "0.5rem",
            transition: {
                duration: 0,
                ease: "easeOut"
            }
        },
        minimizing: {
            opacity: 0.8,
            scale: 1,
            width: "40%",
            height: "40%",
            y: 100,
            borderRadius: "0.5rem",
            transition: {
                duration: 0.75,
                ease: "easeOut"
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { delay: 0.2, duration: 0.4 }
        }
    };

    return (
        <div className="w-full h-screen mx-auto relative bg-gradient-to-t from-pink-300 to-purple-300 p-4 overflow-hidden">
            <motion.div
                initial={cardVariants.initial}
                animate={isMinimizing ? cardVariants.minimizing : cardVariants.maximized}
                exit={{ opacity: 0, scale: 0.8 }}
                onAnimationComplete={handleAnimationComplete}
                className="w-full h-full rounded-lg bg-white/30 backdrop-blur-md border border-white/20 shadow-lg"
                style={{
                    transformOrigin: "left left",
                    margin: "0 auto"
                }}
            >
                <Card className="bg-transparent border-none shadow-none h-full relative">
                    <div className="flex justify-end p-4">
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Minimize className="cursor-pointer" onClick={handleMinimize} />
                        </motion.div>
                    </div>
                    <CardBody className="flex flex-col items-center justify-center p-8">
                        {isInitialLoading || !isContentVisible || isMinimizing ? (
                            <SkeletonLoader type="detailed" />
                        ) : (
                            <motion.div
                                className="w-full flex flex-col items-center justify-center"
                                initial="hidden"
                                animate="visible"
                                variants={contentVariants}
                            >
                                {card.component ? (
                                    React.createElement(card.component, {
                                        className: getDetailedComponentClass(card.id)
                                    })
                                ) : (
                                    <SkeletonLoader type="content" />
                                )}
                            </motion.div>
                        )}
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
}
