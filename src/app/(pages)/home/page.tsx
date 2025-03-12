"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Input,
    Chip,
    Accordion,
    AccordionItem,
    Progress
} from "@heroui/react";

import {
    animationVariants,
    benefitsData,
    featuresData,
    progressData,
    statisticsData,
    faqData,
    pageContent
} from '@/context/homeData';

const Page = () => {
    // Destructure animation variants for easier access
    const { containerVariants, itemVariants, listItemVariants } = animationVariants;

    // Email input state for newsletter
    const [email, setEmail] = useState("");

    return (
        <motion.div
            className="h-full w-full flex items-center justify-center p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="w-full">
                <motion.div
                    className="overflow-y-auto h-full"
                    variants={itemVariants}
                >
                    <div className="p-8">
                        {/* Header Section */}
                        <motion.h1
                            className="text-3xl md:text-5xl font-bold text-center text-indigo-800 mb-4"
                            variants={itemVariants}
                        >
                            {pageContent.header.title}
                        </motion.h1>

                        <motion.div
                            className="h-1 w-32 bg-indigo-500 mx-auto mb-8"
                            variants={itemVariants}
                        />

                        <motion.p
                            className="text-lg text-gray-600 text-center mb-6 max-w-4xl mx-auto"
                            variants={itemVariants}
                        >
                            {pageContent.header.description}
                        </motion.p>

                        {/* Key Benefits Section */}
                        <motion.div
                            className="my-12 max-w-6xl mx-auto"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
                                {pageContent.sections.benefits.title}
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {benefitsData.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        variants={listItemVariants}
                                        custom={index}
                                    >
                                        <Card className="bg-indigo-50/80 border-none">
                                            <CardBody className="flex flex-row items-start gap-4">
                                                <div className="bg-indigo-100 rounded-full p-2 flex-shrink-0">
                                                    <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-indigo-800">{benefit.title}</h3>
                                                    <p className="text-gray-600 text-sm mt-1">{benefit.description}</p>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Main Features Section */}
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                            variants={itemVariants}
                        >
                            {featuresData.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <Card className="bg-indigo-50 h-full" isHoverable>
                                        <CardHeader className="flex-col items-center pb-0">
                                            <div className="text-4xl mb-2">{item.icon}</div>
                                            <h3 className="text-xl font-semibold text-indigo-700">{item.title}</h3>
                                        </CardHeader>
                                        <CardBody className="text-center">
                                            <p className="text-gray-600 mb-4">{item.description}</p>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {item.features.map((feature, i) => (
                                                    <Chip
                                                        key={i}
                                                        color="primary"
                                                        variant="flat"
                                                        size="sm"
                                                    >
                                                        {feature}
                                                    </Chip>
                                                ))}
                                            </div>
                                        </CardBody>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Progress Section */}
                        <motion.div
                            className="mt-16 py-6"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
                                {pageContent.sections.progress.title}
                            </h2>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {progressData.map((item, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm font-medium text-indigo-700">{item.label}</span>
                                            <span className="text-sm font-medium text-indigo-700">{item.value}%</span>
                                        </div>
                                        <Progress
                                            color={item.color}
                                            value={item.value}
                                            className="h-2"
                                            aria-label={`${item.label} progress`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Statistics Section */}
                        <motion.div
                            className="mt-16 py-8 px-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-center text-indigo-800 mb-8">
                                {pageContent.sections.statistics.title}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                {statisticsData.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4"
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Card className="bg-white/60 py-2" shadow="sm">
                                            <CardBody className="text-center py-2">
                                                <div className="text-3xl font-bold text-indigo-700">{stat.value}</div>
                                                <div className="text-gray-600">{stat.label}</div>
                                            </CardBody>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* FAQ Section with Accordion */}
                        <motion.div
                            className="mt-16"
                            variants={itemVariants}
                        >
                            <h2 className="text-2xl font-bold text-center text-indigo-800 mb-8">
                                {pageContent.sections.faq.title}
                            </h2>
                            <div className="max-w-6xl mx-auto">
                                <Accordion variant="splitted">
                                    {faqData.map((faq) => (
                                        <AccordionItem key={faq.key} title={faq.question} className="text-indigo-800">
                                            <p className="text-gray-600">{faq.answer}</p>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            className="mt-16 text-center"
                            variants={itemVariants}
                        >
                            <Card className="bg-indigo-100 border-none">
                                <CardBody className="py-8">
                                    <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                                        {pageContent.cta.title}
                                    </h2>
                                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                                        {pageContent.cta.description}
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                                        <Button
                                            color="primary"
                                            size="lg"
                                            radius="full"
                                            className="font-medium"
                                        >
                                            {pageContent.cta.primaryButton}
                                        </Button>
                                        <Button
                                            variant="bordered"
                                            color="primary"
                                            size="lg"
                                            radius="full"
                                            className="font-medium"
                                        >
                                            {pageContent.cta.secondaryButton}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">{pageContent.cta.footnote}</p>
                                </CardBody>
                            </Card>
                        </motion.div>

                        {/* Newsletter Section */}
                        <motion.div
                            className="mt-16"
                            variants={itemVariants}
                        >
                            <Divider className="my-4" />
                            <div className="pt-8 max-w-md mx-auto">
                                <h3 className="text-lg font-semibold text-center text-indigo-700 mb-4">
                                    {pageContent.newsletter.title}
                                </h3>
                                <p className="text-gray-600 text-center text-sm mb-6">
                                    {pageContent.newsletter.description}
                                </p>
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-grow"
                                        variant="bordered"
                                        radius="lg"
                                    />
                                    <Button
                                        color="primary"
                                        radius="lg"
                                    >
                                        {pageContent.newsletter.buttonText}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Page;