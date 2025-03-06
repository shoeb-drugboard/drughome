import React from 'react'
import Image from 'next/image';
// import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Avatar } from "@heroui/avatar";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { Navbar, NavbarContent, NavbarBrand } from "@heroui/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";

const NavigationBar = () => {
    return (
        <Navbar isBlurred={false} className='bg-white/5 backdrop-blur-xl fixed top-0 left-0 flex justify-between h-24 px-4 w-full'>
            <NavbarContent as="div" className="items-center" justify="start">
                <NavbarBrand className="mr-4">
                    <Image src={'./logo.svg'} alt="ACME Logo" height={360} width={360} className='' />
                    {/* <p className="hidden sm:block font-bold text-inherit">ACME</p> */}
                </NavbarBrand>
                <NavbarContent as="div" className="hidden sm:flex items-center gap-4">
                    {/* <Link href="/home">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link> */}
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center mx-auto" justify="end">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-full h-16",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper:
                            "h-full font-normal text-default-500 bg-white/80 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                />
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">zoey@example.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}

export default NavigationBar;