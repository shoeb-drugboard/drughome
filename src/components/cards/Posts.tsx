import React from 'react';
import cn from '@/utils/cn';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/dropdown';
import { Card, CardHeader, CardBody, CardFooter, Button, ScrollShadow, Input, Chip } from "@heroui/react";
import { Tooltip } from '@heroui/react';
import { BookmarkPlus, ChevronDown, Clock, Link, Maximize, Minimize, Search, Share2, UserCircle, Grid, List } from 'lucide-react';
import { motion } from "framer-motion";

interface PostsProps {
    className?: string;
    cardId: string;
    maximizedCard: string | null;
    toggleMaximize: (cardId: string) => void;
}

interface PostData {
    id: number;
    title: string;
    summary: string;
    link: string;
    color: string;
    createdAt: string;
    author: string;
    readTime: string;
    category: string;
    tags: string[];
    bookmarked: boolean;
}

const Posts = ({ className, cardId, maximizedCard, toggleMaximize }: PostsProps) => {
    const isMaximized = maximizedCard === cardId;

    // Enhanced post data
    const postData: PostData[] = React.useMemo(() => {
        const flatColors = [
            "#F9F5EB", // Soft cream
            "#E3F2FD", // Light blue
            "#F5F5DC", // Beige
            "#E8F5E9", // Mint green
            "#FFF3E0", // Light orange
            "#F3E5F5", // Light purple
        ];

        return [
            {
                id: 1,
                title: "Latest Drug Research",
                summary: "New findings in pharmaceutical research show promising results for treatment of chronic conditions.",
                link: "https://example.com/drug-research",
                color: flatColors[0],
                createdAt: "2023-08-15T14:30:00Z",
                author: "Dr. Sarah Johnson",
                readTime: "4 min",
                category: "Research",
                tags: ["pharmaceutical", "chronic conditions", "research"],
                bookmarked: false
            },
            {
                id: 2,
                title: "Medication Safety Guidelines",
                summary: "Updated safety protocols for medication administration in clinical settings.",
                link: "https://example.com/safety-guidelines",
                color: flatColors[1],
                createdAt: "2023-08-10T09:45:00Z",
                author: "Clinical Safety Board",
                readTime: "7 min",
                category: "Guidelines",
                tags: ["safety", "clinical", "protocols"],
                bookmarked: true
            },
            {
                id: 3,
                title: "Drug Interaction Database",
                summary: "Access our comprehensive database of known drug interactions to ensure patient safety.",
                link: "https://example.com/interactions",
                color: flatColors[2],
                createdAt: "2023-08-05T16:20:00Z",
                author: "Pharmacology Dept",
                readTime: "3 min",
                category: "Database",
                tags: ["interactions", "safety", "database"],
                bookmarked: false
            },
            {
                id: 4,
                title: "Clinical Trial Results",
                summary: "Recent phase III clinical trial shows promising efficacy for new antibiotic treatment.",
                link: "https://example.com/clinical-trials",
                color: flatColors[3],
                createdAt: "2023-08-02T11:15:00Z",
                author: "Dr. Michael Chen",
                readTime: "5 min",
                category: "Clinical Trials",
                tags: ["antibiotics", "trials", "research"],
                bookmarked: false
            },
            {
                id: 5,
                title: "New FDA Approvals",
                summary: "FDA grants approval for breakthrough therapy targeting rare genetic disorders.",
                link: "https://example.com/fda-approvals",
                color: flatColors[4],
                createdAt: "2023-07-28T08:30:00Z",
                author: "Regulatory Affairs",
                readTime: "6 min",
                category: "Approvals",
                tags: ["FDA", "genetic disorders", "therapy"],
                bookmarked: true
            },
            {
                id: 6,
                title: "Pharmacogenomics Updates",
                summary: "How genetic testing is revolutionizing personalized medication dosing and selection.",
                link: "https://example.com/pharmacogenomics",
                color: flatColors[5],
                createdAt: "2023-07-25T13:45:00Z",
                author: "Genetics Team",
                readTime: "8 min",
                category: "Research",
                tags: ["genetics", "personalized medicine", "dosing"],
                bookmarked: false
            }
        ];
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // States
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["all"]));
    const [searchTerm, setSearchTerm] = React.useState("");
    const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
    // const [sortOption, setSortOption] = React.useState<"newest" | "oldest" | "popular">("newest");
    const [bookmarkedPosts, setBookmarkedPosts] = React.useState<number[]>([2, 5]);

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replace(/_/g, " "),
        [selectedKeys],
    );

    // Filter posts based on dropdown selection, search term and sorting
    const filteredPosts = React.useMemo(() => {
        let filtered = postData;

        const category = Array.from(selectedKeys)[0];
        if (category && category !== "all") {
            filtered = filtered.filter(post =>
                post.category.toLowerCase() === category.toLowerCase() ||
                post.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase())));
        }

        if (searchTerm) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Sort posts
        return filtered.sort((a, b) => {

            // Popular - simulating with bookmarked posts being more popular
            const aPopularity = bookmarkedPosts.includes(a.id) ? 1 : 0;
            const bPopularity = bookmarkedPosts.includes(b.id) ? 1 : 0;
            return bPopularity - aPopularity;
        });
    }, [postData, selectedKeys, searchTerm, bookmarkedPosts]);

    // Toggle bookmark
    const toggleBookmark = (postId: number) => {
        if (bookmarkedPosts.includes(postId)) {
            setBookmarkedPosts(bookmarkedPosts.filter(id => id !== postId));
        } else {
            setBookmarkedPosts([...bookmarkedPosts, postId]);
        }
    };

    return (
        <Card className={cn("w-full h-full relative bg-white/60 backdrop-blur-xl", className)}>
            <div className="w-full p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-bold -translate-y-6">Recent Posts</h2>
                    {!isMaximized && <div />}
                </div>

                {isMaximized && (
                    <>
                        <div className="flex justify-between items-center w-full">
                            <Dropdown className=''>
                                <DropdownTrigger className='w-full bg-black/45 backdrop-blur-lg text-white rounded-xl'>
                                    <Button className="capitalize text-lg font-semibold flex justify-between items-center" variant="bordered">
                                        {selectedValue} <ChevronDown size={24} className='mt-1' />
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    disallowEmptySelection
                                    aria-label="Categories"
                                    selectedKeys={selectedKeys}
                                    selectionMode="single"
                                    variant="flat"
                                    onSelectionChange={(keys) => setSelectedKeys(new Set(keys as unknown as string[]))}
                                >
                                    <DropdownItem key="all">All Posts</DropdownItem>
                                    <DropdownItem key="research">Research</DropdownItem>
                                    <DropdownItem key="guidelines">Guidelines</DropdownItem>
                                    <DropdownItem key="clinical trials">Clinical Trials</DropdownItem>
                                    <DropdownItem key="approvals">Regulatory Approvals</DropdownItem>
                                    <DropdownItem key="database">Databases</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="flex justify-between items-center gap-3">
                            <Input
                                className="flex-1"
                                placeholder="Search posts..."
                                startContent={<Search size={16} />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <Tooltip content="Grid View">
                                    <Button
                                        isIconOnly
                                        variant={viewMode === "grid" ? "solid" : "light"}
                                        onClick={() => setViewMode("grid")}
                                    >
                                        <Grid size={16} />
                                    </Button>
                                </Tooltip>
                                <Tooltip content="List View">
                                    <Button
                                        isIconOnly
                                        variant={viewMode === "list" ? "solid" : "light"}
                                        onClick={() => setViewMode("list")}
                                    >
                                        <List size={16} />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <ScrollShadow orientation="horizontal" className="w-full bg-transparent px-4 scroll-smooth 
                    [&::-webkit-scrollbar]:w-1 
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-black
                    [&::-webkit-scrollbar-thumb]:rounded-full ">
                <div className={cn(
                    "gap-4 pb-4 overflow-x-auto scroll-smooth",
                    viewMode === "grid" ? "flex flex-col" : "flex flex-col",
                    "[&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black [&::-webkit-scrollbar-thumb]:rounded-full"
                )}>
                    {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                        <Card
                            key={post.id}
                            className={cn(
                                "shadow-none",
                                viewMode === "grid" ? "w-full" : "w-full"
                            )}
                            style={{ backgroundColor: post.color }}
                        >
                            <CardHeader className="flex-col items-start py-2 relative w-full">
                                <div className="flex items-center gap-2 mb-1 w-full">
                                    <Chip color="primary" variant="flat">{post.category}</Chip>
                                    <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
                                        <Clock size={12} /> {post.readTime}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg pr-8">{post.title}</h3>
                                <div className="flex items-center gap-2 mt-1 w-full">
                                    <span className="text-xs text-gray-600 flex items-center gap-1">
                                        <UserCircle size={14} /> {post.author}
                                    </span>
                                    <span className="text-xs text-gray-500 ml-auto">
                                        {formatDate(post.createdAt)}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardBody className='py-2'>
                                <p>{post.summary}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {post.tags.map((tag, index) => (
                                        <Chip key={index} variant="dot" color="secondary" className="text-xs">
                                            {tag}
                                        </Chip>
                                    ))}
                                </div>
                            </CardBody>
                            <CardFooter className='py-2 flex justify-between'>
                                <div className="flex gap-1">
                                    <Button
                                        color="secondary"
                                        as="a"
                                        href={post.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        isIconOnly
                                        variant='ghost'
                                    >
                                        <Link size={16} />
                                    </Button>
                                    <Button
                                        color={bookmarkedPosts.includes(post.id) ? "primary" : "default"}
                                        isIconOnly
                                        variant='ghost'
                                        onClick={() => toggleBookmark(post.id)}
                                    >
                                        <BookmarkPlus size={16} />
                                    </Button>
                                    <Button
                                        color="default"
                                        isIconOnly
                                        variant='ghost'
                                    >
                                        <Share2 size={16} />
                                    </Button>
                                </div>
                                <Button size="sm" variant="flat" color="primary">
                                    Read More
                                </Button>
                            </CardFooter>
                        </Card>
                    )) : (
                        <div className="w-full text-center py-8 text-gray-500">
                            No posts found matching your criteria
                        </div>
                    )}
                </div>
            </ScrollShadow>
            {/* max/min buttons */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                className='absolute top-2 right-2 flex bg-transparent gap-0 translate-x-0 -translate-y-0 z-10 p-0 m-0'
            >
                <Button className='bg-transparent p-0' onClick={() => toggleMaximize(cardId)}>
                    {isMaximized ?
                        <Minimize size={16} className="text-gray-500 hover:text-gray-700" /> :
                        <Maximize size={16} className="text-gray-500 hover:text-gray-700" />
                    }
                </Button>
            </motion.div>
        </Card>
    );
}

export default Posts;