'use client'

import {
    Navbar as HeroUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { TelegramIcon } from "@/components/icons";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuItemClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <HeroUINavbar 
            maxWidth="xl" 
            position="sticky"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="border-b border-divider"
        >
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold text-inherit">
                            <span className="hidden lg:inline">{siteConfig.fullName}</span>
                            <span className="lg:hidden">{siteConfig.name}</span>
                        </p>
                    </NextLink>
                </NavbarBrand>
                <ul className="hidden lg:flex gap-4 justify-start ml-2">
                    {siteConfig.navItems.map((item) => (
                        <NavbarItem key={item.href}>
                            <a
                                className={clsx(
                                    linkStyles({ color: "foreground" }),
                                    "data-[active=true]:text-primary data-[active=true]:font-medium whitespace-nowrap",
                                )}
                                href={item.href}
                            >
                                {item.label}
                            </a>
                        </NavbarItem>
                    ))}
                </ul>
            </NavbarContent>

            <NavbarContent
                className="hidden lg:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden lg:flex gap-2">
                    <a 
                        href={`tel:${siteConfig.contact.phone}`}
                        className="flex items-center gap-2 text-default-500 hover:text-primary transition-colors whitespace-nowrap"
                        aria-label="Позвонить"
                    >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm font-medium hidden md:inline">
                            {siteConfig.contact.phone}
                        </span>
                    </a>
                    <Link isExternal aria-label="Telegram" href={siteConfig.social.telegram}>
                        <TelegramIcon className="text-default-500" />
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
                <a 
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center text-default-500 hover:text-primary transition-colors mr-2"
                    aria-label="Позвонить"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </a>
                <Link isExternal aria-label="Telegram" href={siteConfig.social.telegram}>
                    <TelegramIcon className="text-default-500" />
                </Link>
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu>
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <a
                                className="text-foreground text-lg w-full block"
                                href={item.href}
                                onClick={handleMenuItemClick}
                            >
                                {item.label}
                            </a>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </HeroUINavbar>
    );
};