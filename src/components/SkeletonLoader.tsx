import React from "react";
import { motion } from "framer-motion";

interface SkeletonLoaderProps {
    type?: "card" | "content" | "detailed";
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = "card" }) => {
    const pulseAnimation = {
        initial: { opacity: 0.6 },
        animate: {
            opacity: [0.6, 0.8, 0.6],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop" as const,
            }
        }
    };

    if (type === "card") {
        return (
            <div className="w-full h-full flex flex-col p-4">
                <motion.div
                    className="h-6 w-3/4 bg-gray-200/50 rounded-md mb-4"
                    initial={pulseAnimation.initial}
                    animate={pulseAnimation.animate}
                />
                <motion.div
                    className="h-24 w-full bg-gray-200/50 rounded-md mb-4"
                    initial={pulseAnimation.initial}
                    animate={pulseAnimation.animate}
                />
                <motion.div
                    className="h-4 w-1/2 bg-gray-200/50 rounded-md"
                    initial={pulseAnimation.initial}
                    animate={pulseAnimation.animate}
                />
            </div>
        );
    }

    if (type === "detailed") {
        return (
            <div className="w-full h-full flex flex-col p-6">
                <motion.div
                    className="h-8 w-1/2 bg-gray-200/50 rounded-md mb-6 mx-auto"
                    initial={pulseAnimation.initial}
                    animate={pulseAnimation.animate}
                />
                <motion.div
                    className="h-64 w-full bg-gray-200/50 rounded-md mb-6"
                    initial={pulseAnimation.initial}
                    animate={pulseAnimation.animate}
                />
                <motion.div
                    className="h-4 w-3/4 bg-gray-200/50 rounded-md mb-3 mx-auto"
                    initial={pulseAnimation.initial}
                    animate={pulseAnimation.animate}
                />
                <motion.div
                    className="h-4 w-2/3 bg-gray-200/50 rounded-md mx-auto"
                    initial={pulseAnimation.initial}
                    animate={pulseAnimation.animate}
                />
            </div>
        );
    }
    return (
        <div className="w-full h-full flex flex-col p-4">
            <motion.div
                className="h-5 w-full bg-gray-200/50 rounded-md mb-3"
                initial={pulseAnimation.initial}
                animate={pulseAnimation.animate}
            />
            <motion.div
                className="h-5 w-full bg-gray-200/50 rounded-md mb-3"
                initial={pulseAnimation.initial}
                animate={pulseAnimation.animate}
            />
            <motion.div
                className="h-5 w-3/4 bg-gray-200/50 rounded-md mb-3"
                initial={pulseAnimation.initial}
                animate={pulseAnimation.animate}
            />
            <motion.div
                className="h-5 w-1/2 bg-gray-200/50 rounded-md"
                initial={pulseAnimation.initial}
                animate={pulseAnimation.animate}
            />
        </div>
    );
};
