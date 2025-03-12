"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Card,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Button,
    Chip,
    Pagination,
    Spinner
} from "@heroui/react";

const mockSavedPosts = [
    {
        id: 1,
        title: "Understanding Drug Interactions",
        excerpt: "An in-depth guide to common drug interactions and how to avoid them.",
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=2940&auto=format&fit=crop",
        category: "Education",
        date: "2023-10-15"
    },
    {
        id: 2,
        title: "New Research on Antibiotics",
        excerpt: "Latest findings on antibiotic resistance and development of new drugs.",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2832&auto=format&fit=crop",
        category: "Research",
        date: "2023-09-28"
    },
    {
        id: 3,
        title: "Medication Adherence Tips",
        excerpt: "Practical strategies to help patients maintain their medication regimen.",
        image: "https://images.unsplash.com/photo-1631549916768-4119b4123a3a?q=80&w=2833&auto=format&fit=crop",
        category: "Patient Care",
        date: "2023-11-02"
    },
    {
        id: 4,
        title: "Emerging Trends in Pharmaceuticals",
        excerpt: "What to expect in the pharmaceutical industry over the next decade.",
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2869&auto=format&fit=crop",
        category: "Industry",
        date: "2023-10-05"
    }
];

const Page = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        exit: { opacity: 0, y: 20 }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen h-full w-full">
                <Spinner size="lg" color="primary" label="Loading saved posts..." />
            </div>
        );
    }

    return (
        <div className="py-8 max-w-6xl flex flex-col items-center mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
                exit={{ opacity: 0, y: 20 }}
            >
                <h1 className="text-3xl font-bold text-center">Your Saved Posts</h1>
                <p className="text-center text-gray-500 mt-2">Access all your bookmarked content in one place</p>
            </motion.div>

            {mockSavedPosts.length > 0 ? (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {mockSavedPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            exit={itemVariants.exit}
                        >
                            <Card shadow="sm" className="h-full">
                                <CardBody className="p-0">
                                    <Image
                                        removeWrapper
                                        alt={post.title}
                                        className="object-cover h-48 w-full"
                                        src={post.image}
                                    />
                                </CardBody>
                                <CardBody>
                                    <div className="flex justify-between items-start mb-2">
                                        <Chip size="sm" color="primary" variant="flat">{post.category}</Chip>
                                        <span className="text-xs text-gray-400">{post.date}</span>
                                    </div>
                                    <h2 className="text-xl font-bold">{post.title}</h2>
                                    <p className="text-gray-600 mt-2">{post.excerpt}</p>
                                </CardBody>
                                <Divider />
                                <CardFooter className="flex justify-between">
                                    <Button
                                        color="primary"
                                        variant="light"
                                        size="sm"
                                        as={motion.button}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Read More
                                    </Button>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        size="sm"
                                        as={motion.button}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Remove
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center py-12"
                >
                    <div className="text-gray-400 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium">No saved posts yet</h3>
                    <p className="text-gray-500 mt-2">Start saving posts that interest you!</p>
                    <Button
                        color="primary"
                        className="mt-4"
                        as={motion.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Browse Articles
                    </Button>
                </motion.div>
            )}

            {mockSavedPosts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mt-8"
                    exit={itemVariants.exit}
                >
                    <Pagination
                        total={10}
                        page={page}
                        onChange={setPage}
                        showControls
                    />
                </motion.div>
            )}
        </div>
    );
};

export default Page;