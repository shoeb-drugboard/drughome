import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, User, Chip, Button, ScrollShadow } from "@heroui/react";
import { motion } from "framer-motion";
import { Maximize, Minimize } from "lucide-react";
import cn from '@/utils/cn';

interface MessagesProps {
    className?: string;
    cardId: string;
    maximizedCard: string | null;
    toggleMaximize: (cardId: string) => void;
}

const messageData = [
    {
        id: 1,
        type: "webinar",
        title: "New Therapeutic Approaches",
        author: "Dr. Jane Smith",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        time: "2 hours ago",
        description: "Join us for a discussion on emerging therapeutic approaches in pharmacology."
    },
    {
        id: 2,
        type: "research",
        title: "Clinical Trial Results",
        author: "Prof. Michael Chen",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
        time: "Yesterday",
        description: "Results from our latest clinical trial show promising outcomes for treatment X."
    },
    {
        id: 3,
        type: "item",
        title: "New Drug Formulation",
        author: "Pharmaceutical Inc.",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
        time: "3 days ago",
        description: "Check out our newly approved drug formulation with improved bioavailability."
    },
    {
        id: 4,
        type: "webinar",
        title: "Drug Safety Protocols",
        author: "Dr. Lisa Johnson",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g",
        time: "1 week ago",
        description: "Learn about the latest safety protocols in drug administration and monitoring."
    },
    {
        id: 5,
        type: "research",
        title: "Genomic Markers Study",
        author: "Research Lab XYZ",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h",
        time: "2 weeks ago",
        description: "Our latest study identifies key genomic markers for personalized medicine."
    }
];


const getColorByType = (type: string): "primary" | "success" | "warning" | "secondary" => {
    switch (type) {
        case 'webinar': return "primary";
        case 'research': return "success";
        case 'item': return "warning";
        default: return "secondary";
    }
};

const Messages = ({ className, cardId, maximizedCard, toggleMaximize }: MessagesProps) => {
    const isMaximized = maximizedCard === cardId;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("w-full ", className)}
        >
            <Card className="w-full h-full relative bg-white/60 backdrop-blur-xl">
                <CardHeader className="flex justify-between">
                    <h3 className="text-xl font-bold">Messages</h3>
                    <Chip color="primary" variant="flat" className='mr-14'>
                        {messageData.length} New
                    </Chip>
                </CardHeader>
                <Divider />
                <ScrollShadow hideScrollBar className="h-auto">
                    <CardBody className="gap-4 py-4">
                        {messageData.map((message, index) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                className="w-full h-full"
                            >
                                <Card className="w-full mb-4 bg-black/5 backdrop-blur-lg" isHoverable>
                                    <CardHeader className="flex justify-between">
                                        <User
                                            name={message.author}
                                            description={message.time}
                                            avatarProps={{
                                                src: message.avatar
                                            }}
                                        />
                                        <Chip color={getColorByType(message.type)} variant="flat">
                                            {message.type.toUpperCase()}
                                        </Chip>
                                    </CardHeader>
                                    <CardBody className="py-2">
                                        <h4 className="text-lg font-bold">{message.title}</h4>
                                        <p className="text-default-500">{message.description}</p>
                                    </CardBody>
                                    <CardFooter>
                                        <Button size="sm">View Details</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </CardBody>
                </ScrollShadow>
                <Divider />
                <CardFooter className="justify-center">
                    <Button variant="light">View All Messages</Button>
                </CardFooter>

                {/* Maximize/Minimize Button */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='absolute top-2 right-2 flex bg-transparent gap-0 translate-x-0 -translate-y-0 z-10'
                >
                    <Button className='bg-transparent p-0' onClick={() => toggleMaximize(cardId)}>
                        {isMaximized ?
                            <Minimize size={16} className="text-gray-500 hover:text-gray-700" /> :
                            <Maximize size={16} className="text-gray-500 hover:text-gray-700" />
                        }
                    </Button>
                </motion.div>
            </Card>
        </motion.div>
    );
};

export default Messages;