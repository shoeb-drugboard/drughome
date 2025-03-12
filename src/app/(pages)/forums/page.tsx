"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Badge,
    Divider,
} from "@heroui/react";

const Page = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    // Sample forum categories
    const categories = [
        { id: 1, name: "Drug Information", topics: 156, posts: 1243 },
        { id: 2, name: "Safe Usage", topics: 89, posts: 732 },
        { id: 3, name: "Research & Studies", topics: 124, posts: 967 },
        { id: 4, name: "Community Help", topics: 78, posts: 520 },
    ];

    // Sample recent discussions
    const recentDiscussions = [
        { id: 1, title: "New findings about XYZ substance", author: "ResearchUser", replies: 23, date: "2 hours ago" },
        { id: 2, title: "Questions about safe dosage", author: "SafetyFirst", replies: 15, date: "5 hours ago" },
        { id: 3, title: "Experiences with alternative treatments", author: "Experimenter", replies: 42, date: "1 day ago" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
            >
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4">Drug Information Forums</h1>
                    <p className="text-gray-500">
                        Join discussions, share experiences, and learn from others in our community
                    </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="shadow-md">
                        <CardHeader className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold">Categories</h2>
                        </CardHeader>
                        <CardBody>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {categories.map((category) => (
                                    <motion.div
                                        key={category.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full"
                                    >
                                        <Card shadow="sm" className="border border-gray-200">
                                            <CardHeader className="pb-0">
                                                <h3 className="text-xl font-bold">{category.name}</h3>
                                            </CardHeader>
                                            <CardBody>
                                                <p>Explore discussions related to {category.name.toLowerCase()}</p>
                                            </CardBody>
                                            <CardFooter className="flex flex-col items-start gap-2">
                                                <p className="text-small text-gray-500">
                                                    {category.topics} topics • {category.posts} posts
                                                </p>
                                                <Button color="primary" size="sm">Browse Topics</Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="shadow-md">
                        <CardHeader className="flex flex-col gap-1">
                            <h2 className="text-2xl font-bold">Recent Discussions</h2>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="flex flex-col gap-4">
                                {recentDiscussions.map((discussion) => (
                                    <motion.div
                                        key={discussion.id}
                                        whileHover={{
                                            scale: 1.01,
                                            backgroundColor: "rgba(0,0,0,0.02)"
                                        }}
                                        className="rounded-lg"
                                    >
                                        <Card className="w-full">
                                            <CardHeader className="flex justify-between items-start">
                                                <h4 className="text-lg font-medium">{discussion.title}</h4>
                                                <Badge color="primary" variant="flat">{discussion.replies} replies</Badge>
                                            </CardHeader>
                                            <Divider />
                                            <CardFooter className="flex justify-between py-2">
                                                <span className="text-small text-gray-500">
                                                    Posted by: {discussion.author}
                                                </span>
                                                <span className="text-small text-gray-500">
                                                    {discussion.date}
                                                </span>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </CardBody>
                        <CardFooter>
                            <Button color="default">View All Discussions</Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="mt-8"
                >
                    <Card className="bg-primary-500 text-white shadow-lg">
                        <CardBody>
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        Have a question or topic to discuss?
                                    </h3>
                                    <p className="text-white/90">
                                        Join our community and start a new discussion today!
                                    </p>
                                </div>
                                <Button color="secondary" size="lg" className="font-semibold">
                                    Create New Topic
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Page;