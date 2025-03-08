import React, { useState } from "react";
import { useRouter } from "next/navigation";
import cn from "@/utils/cn";
import { Card } from "@heroui/card";
import { Maximize, Minimize } from "lucide-react";
import { motion } from "framer-motion";
import { CardSizeConfig } from "@/context/cardData";
import { SkeletonLoader } from "./SkeletonLoader";

type BentoCardProps = {
    id: number;
    maximizedCard: number | null;
    toggleMaximize: (id: number) => void;
    sizeConfig: CardSizeConfig;
    index: number;
    component?: React.FC<{ className?: string }>;
    componentClassName?: string;
};

export const BentoCard: React.FC<BentoCardProps> = ({
    id,
    maximizedCard,
    toggleMaximize,
    sizeConfig,
    component,
    componentClassName,
}) => {
    const router = useRouter();
    const isMaximized = maximizedCard === id;
    const isAnotherCardMaximized = maximizedCard !== null && maximizedCard !== id;
    const [isExpanding, setIsExpanding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const cardClassName = cn(
        "bg-white/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg overflow-hidden",
        isAnotherCardMaximized ? "invisible" : "visible",
        "col-span-1",
        isMaximized
            ? "col-span-full row-span-full h-screen z-50"
            : cn(
                sizeConfig.md || "",
                sizeConfig.xl || "",
                sizeConfig.default
            )
    );

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isMaximized) {
            toggleMaximize(id);
        } else {
            setIsExpanding(true);
            setIsLoading(true);
            toggleMaximize(id);
            router.push(`/card/${id}`);
        }
    };

    const cardVariants = {
        normal: { scale: 1, opacity: 1, zIndex: 1 },
        expanding: {
            scale: 1,
            scaleY: 0.95,
            opacity: 0.85,
            zIndex: 50,
            transition: {
                ease: "linear"
            }
        },
        hidden: { opacity: 0, zIndex: 1 }
    };

    return (
        <motion.div
            layout
            className={cardClassName}
            initial={{ opacity: 0, scale: 1 }}
            animate={
                isExpanding ? cardVariants.expanding :
                    isMaximized ? cardVariants.expanding :
                        isAnotherCardMaximized ? cardVariants.hidden :
                            cardVariants.normal
            }
            transition={{
                layout: { duration: 0.5 },
                opacity: { duration: isAnotherCardMaximized ? 0.2 : 0.5 }
            }}
        >
            <Card className="bg-transparent border-none shadow-sm relative h-full">
                <div className="absolute top-2 right-2 z-10">
                    <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMaximized ? (
                            <Minimize className="cursor-pointer" onClick={handleToggle} />
                        ) : (
                            <Maximize className="cursor-pointer" onClick={handleToggle} />
                        )}
                    </motion.div>
                </div>
                {/* <CardBody className="flex items-center justify-center text-4xl font-bold h-full w-full"> */}
                {isLoading && isExpanding ? (
                    <SkeletonLoader type="card" />
                ) : (
                    component ?
                        React.createElement(component, { className: componentClassName }) :
                        <SkeletonLoader type="card" />
                )}
                {/* </CardBody> */}
            </Card>
        </motion.div>
    );
};
