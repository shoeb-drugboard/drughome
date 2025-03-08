import cn from '../utils/cn';
import React, { useState } from 'react';
import { Spinner } from '@heroui/spinner';
import { useRouter } from 'next/navigation';
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
    title?: string;
    description?: string;
};

type BentoCardProps = {
    id: number;
    maximizedCard: number | null;
    toggleMaximize: (id: number) => void;
    children: React.ReactNode;
    sizeConfig: CardSizeConfig;
    index: number;
    title?: string;
    description?: string;
};

const BentoCard: React.FC<BentoCardProps> = ({
    id,
    maximizedCard,
    toggleMaximize,
    children,
    sizeConfig,

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

            // setTimeout(() => {
            router.push(`/card/${id}`);
            // }, 200); // Longer delay to show the partial expansion
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
                    {isLoading && isExpanding ? (
                        <div className="flex flex-col items-center justify-center">
                            <Spinner size="lg" />
                            <p className="mt-2 text-lg">Loading...</p>
                        </div>
                    ) : (
                        children
                    )}
                </CardBody>
            </Card>
        </motion.div>
    );
};

const cards: CardData[] = [
    {
        id: 1,
        content: "1",
        title: "Card One",
        description: "This is the first card with detailed content.",
        sizeConfig: {
            default: "",
            md: "md:col-span-3 md:row-span-6",
            xl: "xl:col-span-2 xl:row-span-6"
        }
    },
    {
        id: 2,
        content: "2",
        title: "Card Two",
        description: "This is the second card with more information.",
        sizeConfig: {
            default: "",
            md: "md:col-span-3 md:row-span-6",
            xl: "xl:col-span-5 xl:row-span-6"
        }
    },
    {
        id: 3,
        content: "3",
        title: "Card Three",
        description: "A third card with additional details.",
        sizeConfig: {
            default: "",
            md: "md:col-span-3 md:row-span-6",
            xl: "xl:col-span-3 xl:row-span-6"
        }
    },
    {
        id: 4,
        content: "4",
        title: "Card Four",
        description: "The fourth card with extra information.",
        sizeConfig: {
            default: "",
            md: "md:col-span-3 md:row-span-6",
            xl: "xl:col-span-3 xl:row-span-6"
        }
    },
    {
        id: 5,
        content: "5",
        title: "Card Five",
        description: "The fifth card with more content.",
        sizeConfig: {
            default: "",
            md: "md:col-span-6 md:row-span-6",
            xl: "xl:col-span-5 xl:row-span-6"
        }
    },
    {
        id: 6,
        content: "6",
        title: "Card Six",
        description: "The sixth and final card with details.",
        sizeConfig: {
            default: "",
            md: "md:col-span-6 md:row-span-6",
            xl: "xl:col-span-2 xl:row-span-6"
        }
    }
];

// Make cards available for import in other files
export { cards };

const BentoGridV4: React.FC = () => {
    const [maximizedCard, setMaximizedCard] = useState<number | null>(null);

    const toggleMaximize = (id: number) => {
        setMaximizedCard(maximizedCard === id ? null : id);
    };

    return (
        // <div className="w-full h-full mx-auto relative ">
        <div className="h-full p-4 rounded-sm grid grid-flow-dense grid-rows-12 gap-[1.5vw] md:grid-cols-6 xl:grid-cols-10 relative overflow-hidden">
            <AnimatePresence>
                {cards.map((card, index) => (
                    <BentoCard
                        key={card.id}
                        id={card.id}
                        index={index}
                        maximizedCard={maximizedCard}
                        toggleMaximize={toggleMaximize}
                        sizeConfig={card.sizeConfig}
                        title={card.title}
                        description={card.description}
                    >
                        {card.content}
                    </BentoCard>
                ))}
            </AnimatePresence>
        </div>
        // </div>
    );
};

export default BentoGridV4;