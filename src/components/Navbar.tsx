"use client";
import React from 'react'
import { Input, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react'
import { Search, Bell } from 'lucide-react'
import Image from 'next/image'
import { Modal, Button, Card, CardBody } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import cn from '@/utils/cn';

const Navbar = ({ className }: { className?: string }) => {
    const [searchTerm, setSearchTerm] = React.useState('')
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const notifications = [
        { id: 1, message: "New medication added to database", time: "5 min ago", read: false },
        { id: 2, message: "Dosage update for Aspirin", time: "1 hour ago", read: false },
        { id: 3, message: "System maintenance scheduled", time: "Yesterday", read: true },
        { id: 4, message: "Inventory alert: Low stock on Ibuprofen", time: "2 days ago", read: true },
    ]

    const unreadCount = notifications.filter(notif => !notif.read).length;
    const stackPreview = notifications.slice(0, 3);

    return (
        <div className={cn("bg-transparent p-4 flex items-center justify-between w-full", className)}>
            <div className="logo flex ">
                <Image src="/logo.svg" alt="logo" width={280} height={280} className="w-full cursor-pointer min-w-[155px] md:min-w-[180px]" />
            </div>

            <div className="searchbar flex-grow max-w-3xl mx-4">
                <Input
                    className="w-full py-4 rounded-full text-lg"
                    placeholder="Search ..."
                    startContent={<Search size={24} className="ml-2" />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="lg"
                    variant="bordered"
                    classNames={{
                        input: "text-md pl-1",
                        inputWrapper: "h-14 shadow-md bg-white hover:shadow-lg transition-shadow"
                    }}
                />
            </div>

            <div className="notification-panel flex-shrink-0 ml-4 relative flex items-center">
                <motion.div
                    className="md:hidden relative cursor-pointer"
                    onClick={onOpen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Bell size={24} />
                    {unreadCount > 0 && (
                        <motion.div
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            {unreadCount}
                        </motion.div>
                    )}
                </motion.div>
                <motion.div
                    className="relative cursor-pointer h-20 w-64 hidden md:block"
                    onClick={onOpen}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {stackPreview.map((notification, index) => (
                        <motion.div
                            key={notification.id}
                            className="absolute rounded-full border border-gray-200 bg-white shadow-sm p-4 py-8 flex items-center justify-center"
                            style={{
                                top: `${index * 8}px`,
                                right: `${index * 6}px`,
                                zIndex: stackPreview.length - index,
                                width: `${100 - (index * 6)}%`,
                                height: `${16 - (index * 1.5)}px`,
                                opacity: `${1 - (index * 0.15)}`,
                            }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1 - (index * 0.15), y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <p className={`text-sm truncate font-semibold text-center w-full p-2 ${index > 0 ? 'scale-' + (100 - (index * 10)) : ''}`}>
                                {notification.message}
                            </p>
                        </motion.div>
                    ))}

                    {unreadCount > 0 && (
                        <motion.div
                            className="absolute -top-2 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-10"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            {unreadCount}
                        </motion.div>
                    )}
                </motion.div>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="md"
                    className='z-50'
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    <h3 className="text-lg font-bold">Notifications</h3>
                                </ModalHeader>
                                <ModalBody>
                                    <AnimatePresence>
                                        {notifications.map((notification, index) => (
                                            <motion.div
                                                key={notification.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <Card
                                                    className={`mb-3 ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
                                                    isPressable
                                                >
                                                    <CardBody className="p-3 w-full">
                                                        <p className={`text-sm w-full ${!notification.read ? 'font-semibold' : ''}`}>
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                    </CardBody>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="bordered" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={() => console.log("Marked all as read")}>
                                        Mark all as read
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}

export default Navbar