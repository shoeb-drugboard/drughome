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

const animationVariants = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
                when: "beforeChildren"
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren"
            }
        }
    },
    card: {
        hidden: { y: -60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 200
            }
        },
        exit: {
            y: -40,
            opacity: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    }
};

const BentoGridV6 = () => {
    const [maximizedCard, setMaximizedCard] = useState<string | null>(null);
    const [transitioningCards, setTransitioningCards] = useState<Record<string, boolean>>({});

    const toggleMaximize = (cardId: string) => {
        setTransitioningCards(prev => ({ ...prev, [cardId]: true }));
        setMaximizedCard(prev => prev === cardId ? null : cardId);
        setTimeout(() => {
            setTransitioningCards(prev => ({ ...prev, [cardId]: false }));
        }, 400);
    };

    const getMaximizedClassName = (cardId: string) => {
        if (maximizedCard === cardId) {
            return 'col-span-full row-span-full z-10 max-h-none md:col-span-6 xl:col-span-12 xl:row-span-12';
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
        <motion.div
            className="h-full w-full p-4 rounded-sm grid grid-flow-dense grid-rows-12 gap-[1.5vw] xl:h-screen md:grid-cols-6 xl:grid-cols-10 relative overflow-hidden"
            variants={animationVariants.container}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    className="h-full w-full col-span-full row-span-full grid grid-flow-dense grid-rows-12 gap-[1.5vw] md:grid-cols-6 xl:grid-cols-12"
                    variants={animationVariants.container}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {showCard('UserProfile') && (
                        <motion.div
                            className={cn(`col-span-full md:col-span-3 lg:col-span-2 xl:col-span-3 row-span-6 h-full max-h-[450px]`, getMaximizedClassName('UserProfile'))}
                            layout
                            variants={animationVariants.card}
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
                            className={cn(`col-span-full md:col-span-3 lg:col-span-4 xl:col-span-6 row-span-6 max-h-[450px]`, getMaximizedClassName('Posts'))}
                            layout
                            variants={animationVariants.card}
                            transition={{ duration: 0.3 }}
                        >
                            {isTransitioning('Posts') ? (
                                <Card className="h-full">
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
                        <motion.div
                            className='col-span-full md:col-span-3 md:row-span-6 lg:col-span-2 xl:col-span-3 row-span-5 lg:row-span-6 xl:row-span-5 max-h-[450px]'
                            variants={animationVariants.card}
                        >
                            <Card className='h-full bg-white/60 backdrop-blur-xl'></Card>
                        </motion.div>
                    )}

                    {showCard('Leaderboard') && (
                        <motion.div
                            className={cn(`col-span-full md:col-span-3 lg:col-span-2 xl:col-span-3 row-span-6 xl:row-span-8 max-h-[450px]`, getMaximizedClassName('Leaderboard'))}
                            layout
                            variants={animationVariants.card}
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
                            className={cn(`col-span-full md:col-span-6 lg:col-span-2 xl:col-span-3 row-span-7 max-h-[450px]`, getMaximizedClassName('SynergyMatch'))}
                            layout
                            variants={animationVariants.card}
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
                            className={cn(`col-span-full md:col-span-6 xl:col-span-6 row-span-7 max-h-[450px]`, getMaximizedClassName('Messages'))}
                            layout
                            variants={animationVariants.card}
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
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )
};

export default BentoGridV6;