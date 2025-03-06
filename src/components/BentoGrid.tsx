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

/**
 * Animation directions for card entrance/exit effects
 */
const cardFlows = [
    { x: '-100vw', y: 0 },       // Left
    { x: '100vw', y: 0 },        // Right
    { x: 0, y: '-100vh' },       // Top
    { x: 0, y: '100vh' },        // Bottom
    { x: '-100vw', y: '-100vh' }, // Top-left
    { x: '100vw', y: '100vh' }    // Bottom-right
];

const springTransition = {
    type: "spring",
    stiffness: 350,
    damping: 30
};

const BentoCard: React.FC<BentoCardProps> = ({
    id,
    maximizedCard,
    toggleMaximize,
    children,
    sizeConfig,
    index
}) => {
    const isMaximized = maximizedCard === id;
    const dirIndex = index % cardFlows.length;
    const entranceDir = cardFlows[dirIndex];

    const cardClassName = isMaximized
        ? "absolute top-0 left-0 w-full h-full z-50 p-4 bg-white/30 backdrop-blur-md"
        : cn(
            "bg-white/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg overflow-hidden",
            "col-span-1 h-full",
            sizeConfig.md || "",
            sizeConfig.xl || "",
            sizeConfig.default
        );

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleMaximize(id);
    };

    return (
        <motion.div
            layout
            transition={springTransition}
            className={cardClassName}
            initial={{
                opacity: 0,
                scale: 0.8,
                ...entranceDir
            }}
            animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0
            }}
            exit={{
                opacity: 0,
                scale: 0.8,
                ...entranceDir
            }}
        >
            <Card className="bg-transparent border-none shadow-none h-full relative">
                <div className="flex justify-end p-2">
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

const BentoGrid: React.FC = () => {
    const [maximizedCard, setMaximizedCard] = useState<number | null>(null);

    const toggleMaximize = (id: number) => {
        setMaximizedCard(maximizedCard === id ? null : id);
    };

    const maximizedCardData = maximizedCard !== null
        ? cards.find(card => card.id === maximizedCard)
        : null;

    return (
        <div className="w-full h-screen mx-auto relative">
            <div className="h-full p-[1vw] rounded-sm bg-gradient-to-l from-pink-300 to-purple-300 grid grid-flow-dense col-start-auto gap-[1.5vw] md:grid-cols-6 xl:grid-cols-10 relative">
                <AnimatePresence mode="wait">
                    {maximizedCard !== null ? (
                        // Only render the maximized card
                        <BentoCard
                            key={maximizedCard}
                            id={maximizedCard}
                            index={cards.findIndex(card => card.id === maximizedCard)}
                            maximizedCard={maximizedCard}
                            toggleMaximize={toggleMaximize}
                            sizeConfig={maximizedCardData?.sizeConfig || cards[0].sizeConfig}
                        >
                            {maximizedCardData?.content || ""}
                        </BentoCard>
                    ) : (
                        <>
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
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BentoGrid;