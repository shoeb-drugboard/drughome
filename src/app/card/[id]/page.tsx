"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Minimize } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '@heroui/card';
import { Spinner } from '@heroui/spinner';
import { cards } from '@/components/Bentov4';

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
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    if (!card) return <div>Card not found</div>;

    const handleMinimize = () => {
        setIsContentVisible(false);
        setTimeout(() => {
            setIsMinimizing(true);
        }, 200);
    };

    const handleAnimationComplete = () => {
        if (isMinimizing) {
            router.push('/');
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
                duration: 0.6,
                ease: "easeOut"
            }
        },
        minimizing: {
            opacity: 0.8,
            scale: 0.5,
            width: "40%",
            height: "40%",
            y: 100,
            borderRadius: "0.5rem",
            transition: {
                duration: 0.5,
                ease: "easeInOut"
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
        <div className="w-full h-screen mx-auto relative bg-gradient-to-t from-pink-300 to-purple-300 p-[1vw] overflow-hidden">
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
                            <div className="flex flex-col items-center justify-center">
                                <Spinner size="lg" />
                                <p className="mt-2 text-lg">
                                    {isMinimizing ? "Minimizing..." : "Loading..."}
                                </p>
                            </div>
                        ) : (
                            <motion.div
                                className="w-full flex flex-col items-center justify-center"
                                initial="hidden"
                                animate="visible"
                                variants={contentVariants}
                            >
                                <h1 className="text-4xl font-bold mb-6">{card.title}</h1>
                                <div className="text-xl mb-8">{card.content}</div>
                                <p className="text-lg">{card.description}</p>
                                <div className="mt-16">
                                    <p>This is the full card view with expanded details.</p>
                                    <p>You can add any content you want here.</p>
                                </div>
                            </motion.div>
                        )}
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
}
