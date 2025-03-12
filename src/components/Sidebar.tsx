"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { Tooltip } from '@heroui/react';
import {
    DoorClosed,
    ChartNoAxesColumnDecreasing,
    HomeIcon,
    LayoutDashboardIcon,
    BookmarkIcon,
    BrainCircuit
} from 'lucide-react';

type PositionType = { x: number, y: number };
type IndicatorStyleType = { top: number, height: number };
type NavItemType = { icon: React.ElementType, path: string, title: string };

const Particles = ({ x, y }: PositionType) => {
    const particles = Array.from({ length: 8 });

    return (
        <AnimatePresence>
            {particles.map((_, i) => {
                const angle = (i / particles.length) * 360;
                return (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
                        initial={{ x, y, opacity: 1, scale: 1.02 }}
                        animate={{
                            x: x + Math.cos(angle * (Math.PI / 180)) * 40,
                            y: y + Math.sin(angle * (Math.PI / 180)) * 40,
                            opacity: 0,
                            scale: 1.5
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                );
            })}
        </AnimatePresence>
    );
};

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState('/dashboard');
    const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyleType>({ top: 0, height: 0 });
    const [clickPosition, setClickPosition] = useState<PositionType>({ x: 0, y: 0 });
    const [showParticles, setShowParticles] = useState(false);

    const itemRefs = useRef(new Map<string, HTMLDivElement>());
    const containerRef = useRef<HTMLDivElement>(null);
    const blobControls = useAnimationControls();
    const variants = {
        blob: {
            default: { borderRadius: "50%", rotate: 0 },
            morphing: {
                borderRadius: ["50%", "40% 60% 60% 40% / 60% 30% 70% 40%", "50%"],
                rotate: [0, 15, 0],
                transition: { duration: 1.2, ease: "easeInOut" }
            }
        },
        float: {
            animate: {
                y: [0, -2, 0],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
        },
        iconRotate: {
            active: {
                rotateY: [0, -100, 10, 0],
                scale: 1.1,
                transition: {
                    rotateY: { duration: 0.8, ease: "easeInOut" },
                    scale: { duration: 0.3 }
                }
            },
            inactive: {
                rotateY: 0,
                scale: 1
            }
        }
    };
    const navItems = useMemo<NavItemType[]>(() => [
        { icon: HomeIcon, path: '/home', title: 'Home' },
        { icon: LayoutDashboardIcon, path: '/', title: 'Dashboard' },
        { icon: BrainCircuit, path: '/forums', title: 'Forums' },
        { icon: BookmarkIcon, path: '/saved-posts', title: 'Saved posts' },
        { icon: ChartNoAxesColumnDecreasing, path: '/analytics', title: 'Analytics' },
        { icon: DoorClosed, path: '/exit', title: 'Exit' },
    ], []);

    useEffect(() => {
        const isValidPath = navItems.some(item => item.path === pathname);
        if (isValidPath) {
            setActiveLink(pathname);
        }
    }, [pathname, navItems]);

    useEffect(() => {
        const currentItemRef = itemRefs.current.get(activeLink);
        if (currentItemRef) {
            const { offsetTop, clientHeight } = currentItemRef;
            setIndicatorStyle({
                top: offsetTop,
                height: clientHeight
            });

            blobControls.start("morphing");
        }
    }, [activeLink, blobControls]);

    const handleNavigation = (path: string, e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setClickPosition({ x: x - 45, y: y - 205 });
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 700);
        }

        setActiveLink(path);
        router.push(path);
    };

    return (
        <motion.div
            className='bg-gradient-to-b from-purple-300 via-purple-400 to-pink-400 flex justify-center items-center p-3 rounded-xl min-w-[80px] h-max border border-black/20 shadow-md relative overflow-hidden'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            ref={containerRef}
        >
            <div className="h-full py-4 flex flex-col items-center justify-evenly text-black gap-4 relative">
                <motion.div
                    // bg-gradient-to-tl from-white/40 to-black/20
                    className="absolute left-0 right-0 bg-white z-0 shadow-lg"
                    initial="default"
                    animate={{
                        ...variants.blob.morphing,
                        top: indicatorStyle.top,
                        height: indicatorStyle.height,
                    }}
                    transition={{
                        top: { type: "spring", stiffness: 300, damping: 20 },
                        height: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                />

                {/* Glow effect */}
                <motion.div
                    className="absolute bg-white/80 w-10 h-10 rounded-full blur-xl"
                    animate={{
                        top: indicatorStyle.top + indicatorStyle.height / 24,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                />

                {showParticles && <Particles x={clickPosition.x} y={clickPosition.y} />}

                {navItems.map((item) => (
                    <Tooltip key={item.path} content={item.title} placement="right">
                        <motion.div
                            ref={el => { if (el) itemRefs.current.set(item.path, el); }}
                            onClick={(e) => handleNavigation(item.path, e)}
                            className="cursor-pointer p-2 rounded-full z-10 relative transform "
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={activeLink === item.path ? variants.float.animate : {}}
                                className={`relative transition-all duration-300 ${activeLink === item.path
                                    ? 'bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 p-1'
                                    : 'text-white py-[4.2px]'
                                    }`}
                                style={{
                                    transform: activeLink === item.path ? 'translateZ(20px)' : 'translateZ(0px)',
                                }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={activeLink === item.path ? variants.iconRotate.active : variants.iconRotate.inactive}
                                >
                                    <item.icon size={24} />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </Tooltip>
                ))}
            </div>
        </motion.div>
    );
};

export default Sidebar;