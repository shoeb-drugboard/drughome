import cn from '../utils/cn';
import React, { useState } from 'react';
import { Card, CardBody } from '@heroui/card';
import { Maximize, Minimize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CardSizeConfig = {
    default: string;
    md?: string;
    xl?: string;
};

type CardData = {
    id: number;
    content: React.ReactNode;
    sizeConfig: CardSizeConfig;
};

type BentoCardProps = {
    id: number;
    maximizedCard: number | null;
    toggleMaximize: (id: number) => void;
    children: React.ReactNode;
    sizeConfig: CardSizeConfig;
    index: number;
};

const BentoCard: React.FC<BentoCardProps> = ({
    id,
    maximizedCard,
    toggleMaximize,
    children,
    sizeConfig,
}) => {
    const isMaximized = maximizedCard === id;
    const isAnotherCardMaximized = maximizedCard !== null && maximizedCard !== id;

    const cardClassName = cn(
        "bg-white/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg overflow-hidden",
        isAnotherCardMaximized ? "invisible" : "visible",
        "col-span-1",
        isMaximized
            ? "col-span-full row-span-full h-screen md:col-span-full md:row-span-full xl:col-span-full xl:row-span-full z-50"
            : cn(
                sizeConfig.md || "",
                sizeConfig.xl || "",
                sizeConfig.default
            )
    );

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleMaximize(id);
    };

    return (
        <motion.div
            layout
            layoutId={`card-${id}`}
            className={cardClassName}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
                opacity: isAnotherCardMaximized ? 0 : 1,
                scale: isMaximized ? 1 : 1,
                zIndex: isMaximized ? 50 : 1
            }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                opacity: {
                    duration: isAnotherCardMaximized ? 0.2 : 0.5,
                    ease: "easeInOut"
                },
                layout: {
                    duration: 0.6,
                    ease: "easeInOut"
                }
            }}
        >
            <Card className="bg-transparent border-none shadow-sm h-full relative">
                <div className="flex justify-end p-2 ">
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
                <CardBody className="flex items-center justify-center text-4xl font-bold h-full">
                    {children}
                </CardBody>
            </Card>
        </motion.div>
    );
};

const cards: CardData[] = [
    {
        id: 1,
        content: "1",
        sizeConfig: {
            default: "",
            md: "md:col-span-3 md:row-span-2",
            xl: "xl:col-span-2 xl:row-span-3"
        }
    },
    {
        id: 2,
        content: "2",
        sizeConfig: {
            default: "",
            md: "md:col-span-3 md:row-span-2",
            xl: "xl:col-span-5 xl:row-span-3"
        }
    },
    {
        id: 3,
        content: "3",
        sizeConfig: {
            default: "",
            md: "md:col-span-3 md:row-span-3",
            xl: "xl:col-span-3 xl:row-span-3"
        }
    },
    {
        id: 4,
        content: "4",
        sizeConfig: {
            default: "",
            md: "md:col-span-3 md:row-span-2",
            xl: "xl:col-span-3 xl:row-span-3"
        }
    },
    {
        id: 5,
        content: "5",
        sizeConfig: {
            default: "",
            md: "md:col-span-6 md:row-span-1",
            xl: "xl:col-span-5 xl:row-span-3"
        }
    },
    {
        id: 6,
        content: "6",
        sizeConfig: {
            default: "",
            md: "md:col-span-6 md:row-span-1",
            xl: "xl:col-span-2 xl:row-span-3"
        }
    }
];

const BentoGridV3: React.FC = () => {
    const [maximizedCard, setMaximizedCard] = useState<number | null>(null);

    const toggleMaximize = (id: number) => {
        setMaximizedCard(maximizedCard === id ? null : id);
    };

    return (
        <div className="w-full h-screen mx-auto relative">
            <div className="h-full p-[1vw] rounded-sm bg-gradient-to-t from-pink-300 to-purple-300 grid grid-flow-dense col-start-auto gap-[1.5vw] md:grid-cols-6 xl:grid-cols-10 relative overflow-hidden">
                <AnimatePresence mode="sync">
                    {cards.map((card, index) => (
                        <BentoCard
                            key={card.id}
                            id={card.id}
                            index={index}
                            maximizedCard={maximizedCard}
                            toggleMaximize={toggleMaximize}
                            sizeConfig={card.sizeConfig}
                        >
                            {card.content}
                        </BentoCard>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BentoGridV3;