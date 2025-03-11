import cn from '@/utils/cn';
import Posts from './cards/Posts';
import { Card } from '@heroui/react';
import Messages from './cards/Messages';
import React, { useState } from 'react';
import UserProfile from './cards/UserProfile';
import Leaderboard from './cards/Leaderboard';
import SynergyMatch from './cards/SynergyMatch';
import { SkeletonLoader } from './SkeletonLoader';
import { AnimatePresence, motion } from 'framer-motion';

export type CardType = 'UserProfile' | 'Posts' | 'Leaderboard' | 'SynergyMatch' | 'Messages' | 'EmptyCard';

const BentoGridV6 = () => {
    const [maximizedCard, setMaximizedCard] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [transitioningCards, setTransitioningCards] = useState<Record<string, boolean>>({});

    const toggleMaximize = (cardId: string) => {
        // Mark the card as transitioning
        setTransitioningCards(prev => ({ ...prev, [cardId]: true }));

        // Update the maximized state
        setMaximizedCard(prev => prev === cardId ? null : cardId);

        // After transition completes, remove the transitioning state
        setTimeout(() => {
            setTransitioningCards(prev => ({ ...prev, [cardId]: false }));
        }, 400); // Slightly longer than animation duration
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const getMaximizedClassName = (cardId: string) => {
        if (maximizedCard === cardId) {
            return 'col-span-full row-span-full z-10';
        }
        return '';
    };

    const showCard = (cardId: string) => {
        if (!maximizedCard) return true;
        return maximizedCard === cardId;
    };

    const isTransitioning = (cardId: string) => {
        return transitioningCards[cardId] === true;
    };

    return (
        <div className="h-full p-4 rounded-sm grid grid-flow-dense grid-rows-12 gap-[1.5vw] md:grid-cols-6 xl:grid-cols-10 relative overflow-hidden">
            <AnimatePresence>
                {isLoading ? (
                    <>
                        <Card className="col-span-2 row-span-6"><SkeletonLoader type="detailed" /></Card>
                        <Card className="col-span-5 row-span-6"><SkeletonLoader /></Card>
                        <Card className="col-span-3 row-span-5"><SkeletonLoader type="content" /></Card>
                        <Card className="col-span-3 row-span-7"><SkeletonLoader /></Card>
                        <Card className="col-span-3 row-span-6"><SkeletonLoader /></Card>
                        <Card className="col-span-4 row-span-6"><SkeletonLoader type="content" /></Card>
                    </>
                ) : (
                    <>
                        {showCard('UserProfile') && (
                            <motion.div
                                className={cn(`col-span-2 row-span-6 h-full`, getMaximizedClassName('UserProfile'))}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isTransitioning('UserProfile') ? (
                                    <Card className="h-full bg-white/60 backdrop-blur-xl">
                                        <SkeletonLoader type="content" />
                                    </Card>
                                ) : (
                                    <UserProfile
                                        cardId="UserProfile"
                                        maximizedCard={maximizedCard}
                                        toggleMaximize={toggleMaximize}
                                        className='h-full bg-white/60 backdrop-blur-xl'
                                    />
                                )}
                            </motion.div>
                        )}

                        {showCard('Posts') && (
                            <motion.div
                                className={cn(`col-span-5 row-span-6`, getMaximizedClassName('Posts'))}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isTransitioning('Posts') ? (
                                    <Card className="h-full py-8">
                                        <SkeletonLoader />
                                    </Card>
                                ) : (
                                    <Posts
                                        cardId="Posts"
                                        maximizedCard={maximizedCard}
                                        toggleMaximize={toggleMaximize}
                                        className='h-full py-8 grid place-content-center'
                                    />
                                )}
                            </motion.div>
                        )}

                        {showCard('EmptyCard') && !maximizedCard && (
                            <Card className='col-span-3 row-span-5 bg-white/60 backdrop-blur-xl'></Card>
                        )}

                        {showCard('Leaderboard') && (
                            <motion.div
                                className={cn(`col-span-3 row-span-7`, getMaximizedClassName('Leaderboard'))}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isTransitioning('Leaderboard') ? (
                                    <Card className="h-full">
                                        <SkeletonLoader type="content" />
                                    </Card>
                                ) : (
                                    <Leaderboard
                                        cardId="Leaderboard"
                                        maximizedCard={maximizedCard}
                                        toggleMaximize={toggleMaximize}
                                        className='h-full'
                                    />
                                )}
                            </motion.div>
                        )}

                        {showCard('SynergyMatch') && (
                            <motion.div
                                className={cn(`col-span-3 row-span-6 `, getMaximizedClassName('SynergyMatch'))}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isTransitioning('SynergyMatch') ? (
                                    <Card className="h-full">
                                        <SkeletonLoader type="content" />
                                    </Card>
                                ) : (
                                    <SynergyMatch
                                        cardId="SynergyMatch"
                                        maximizedCard={maximizedCard}
                                        toggleMaximize={toggleMaximize}
                                        className='h-full'
                                    />
                                )}
                            </motion.div>
                        )}

                        {showCard('Messages') && (
                            <motion.div
                                className={cn(`col-span-4 row-span-6`, getMaximizedClassName('Messages'))}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isTransitioning('Messages') ? (
                                    <Card className="h-full">
                                        <SkeletonLoader type="content" />
                                    </Card>
                                ) : (
                                    <Messages
                                        cardId="Messages"
                                        maximizedCard={maximizedCard}
                                        toggleMaximize={toggleMaximize}
                                        className='h-full'
                                    />
                                )}
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </div>
    )
};

export default BentoGridV6;