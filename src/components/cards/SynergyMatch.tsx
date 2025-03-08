import React from 'react'
import { Card, CardBody, CardHeader, Avatar, Button, Divider, User, AvatarGroup } from "@heroui/react";
import { motion } from "framer-motion";
import { UserPlus, Users, Handshake, Maximize, Minimize } from "lucide-react";
import cn from '@/utils/cn';

interface SynergyMatchProps {
    className?: string;
    cardId: string;
    maximizedCard: string | null;
    toggleMaximize: (cardId: string) => void;
}

const SynergyMatch = ({ className, cardId, maximizedCard, toggleMaximize }: SynergyMatchProps) => {
    const isMaximized = maximizedCard === cardId;

    // Mock data for the three sections
    const synergyMatches = [
        { id: 1, name: "Jane Cooper", role: "Data Scientist", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
        { id: 2, name: "Robert Fox", role: "Pharmacologist", avatar: "https://i.pravatar.cc/150?u=a04258a2462d826712d" },
        { id: 3, name: "Emily Walsh", role: "Biochemist", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    ];

    const peopleToFollow = [
        { id: 1, name: "Leslie Alexander", role: "Medical Researcher", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
        { id: 2, name: "Jacob Jones", role: "Neuroscientist", avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d" },
        { id: 3, name: "Kristin Watson", role: "Clinical Pharmacist", avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d" },
    ];

    const collaborateCards = [
        { id: 1, title: "Drug Interaction Research", members: 4, status: "Active" },
        { id: 2, title: "Clinical Trial Design", members: 6, status: "Recruiting" },
        { id: 3, title: "Side Effects Database", members: 3, status: "Planning" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <Card className={cn("w-full overflow-hidden relative bg-white/60 backdrop-blur-xl", className)}>
            <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
                <h2 className="text-xl font-bold">Network</h2>
                <p className="text-sm text-gray-500">Connect and collaborate with peers</p>
            </CardHeader>
            <CardBody className="overflow-y-auto px-2 custom-scrollbar">
                {/* Synergy Matched People */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 px-2 mb-2">
                        <Users className="text-primary" />
                        <h3 className="text-md font-medium">Synergy Matched People</h3>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-2"
                    >
                        {synergyMatches.map((person) => (
                            <motion.div key={person.id} variants={itemVariants}>
                                <Card className="shadow-sm bg-gradient-to-tr from-primary-50 to-white">
                                    <CardBody className="py-2">
                                        <div className="flex justify-between items-center">
                                            <User
                                                name={person.name}
                                                description={person.role}
                                                avatarProps={{
                                                    src: person.avatar
                                                }}
                                            />
                                            <Button size="sm" color="primary" variant="flat">Connect</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <Divider className="my-2" />

                {/* People to Follow */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 px-2 mb-2">
                        <UserPlus className="text-primary" />
                        <h3 className="text-md font-medium">People to Follow</h3>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-2"
                    >
                        {peopleToFollow.map((person) => (
                            <motion.div key={person.id} variants={itemVariants}>
                                <Card className="shadow-sm bg-gradient-to-tr from-secondary-50 to-white">
                                    <CardBody className="py-2">
                                        <div className="flex justify-between items-center">
                                            <User
                                                name={person.name}
                                                description={person.role}
                                                avatarProps={{
                                                    src: person.avatar
                                                }}
                                            />
                                            <Button size="sm" color="secondary" variant="flat">Follow</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <Divider className="my-2" />

                {/* Collaborate Cards */}
                <div>
                    <div className="flex items-center gap-2 px-2 mb-2">
                        <Handshake className="text-primary" />
                        <h3 className="text-md font-medium">Collaborate</h3>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="space-y-2"
                    >
                        {collaborateCards.map((card) => (
                            <motion.div key={card.id} variants={itemVariants}>
                                <Card className="shadow-sm bg-gradient-to-tr from-success-50 to-white">
                                    <CardBody className="py-3">
                                        <h4 className="font-medium">{card.title}</h4>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center">
                                                <AvatarGroup>
                                                    {[...Array(Math.min(card.members, 3))].map((_, i) => (
                                                        <Avatar
                                                            key={i}
                                                            size="sm"
                                                            src={`https://i.pravatar.cc/150?u=a042581f4e2902${i}704d`}
                                                            className="border-2 border-white"
                                                        />
                                                    ))}
                                                    {card.members > 3 && (
                                                        <Avatar
                                                            size="sm"
                                                            className="border-2 border-white bg-gray-100 text-gray-600"
                                                            name={`+${card.members - 3}`}
                                                        />
                                                    )}
                                                </AvatarGroup>
                                                <span className="text-xs text-gray-500 ml-2">{card.members} members</span>
                                            </div>
                                            <Button size="sm" color="success" variant="flat">Join</Button>
                                        </div>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </CardBody>

            {/* Maximize/Minimize Button */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                className='absolute top-2 right-2 flex bg-transparent gap-0 translate-x-0 -translate-y-0 z-10'
            >
                <Button className='bg-transparent p-0' onPress={() => toggleMaximize(cardId)}>
                    {isMaximized ?
                        <Minimize size={16} className="text-gray-500 hover:text-gray-700" /> :
                        <Maximize size={16} className="text-gray-500 hover:text-gray-700" />
                    }
                </Button>
            </motion.div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(241, 242, 245, 0.6);
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(125, 145, 190, 0.4);
                    border-radius: 10px;
                    transition: background 0.2s ease;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(125, 145, 190, 0.6);
                }
                
                /* For Firefox */
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(125, 145, 190, 0.4) rgba(241, 242, 245, 0.6);
                }
            `}</style>
        </Card>
    );
}

export default SynergyMatch