import React, { useState } from 'react';
import { cards } from '@/context/cardData';
import { BentoCard } from './BentoCard';
import { AnimatePresence } from 'framer-motion';

const BentoGridV5: React.FC = () => {
    const [maximizedCard, setMaximizedCard] = useState<number | null>(null);

    const toggleMaximize = (id: number) => {
        setMaximizedCard(maximizedCard === id ? null : id);
    };

    // Custom class mappings for different card components
    const getComponentClassName = (id: number): string => {
        switch (id) {
            case 1: // UserProfile
                return 'bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-100 w-full h-full';
            case 2:
                return 'bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-100';
            case 3:
                return 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-100';
            case 4:
                return 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-100';
            case 5:
                return 'bg-gradient-to-br from-purple-50 to-violet-100 border-purple-100';
            case 6:
                return 'bg-gradient-to-br from-cyan-50 to-sky-100 border-cyan-100';
            default:
                return '';
        }
    };

    return (
        <div className="h-full p-4 rounded-sm grid grid-flow-dense grid-rows-12 gap-[1.5vw] md:grid-cols-6 xl:grid-cols-10 relative overflow-hidden">
            <AnimatePresence initial={true}>
                {cards.map((card, index) => (
                    <BentoCard
                        key={card.id}
                        id={card.id}
                        index={index}
                        maximizedCard={maximizedCard}
                        toggleMaximize={toggleMaximize}
                        sizeConfig={card.sizeConfig}
                        component={card.component}
                        componentClassName={getComponentClassName(card.id)}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default BentoGridV5;