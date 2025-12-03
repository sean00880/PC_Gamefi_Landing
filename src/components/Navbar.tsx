'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Menu, X, Twitter, Send } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SOCIAL_LINKS } from '@/lib/constants'

const menuItems = [
    { name: 'Features', href: '#' },
    { name: 'Solution', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'About', href: '#' },
]

export const Navbar = () => {
    const [menuState, setMenuState] = useState(false)
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full border-b border-border bg-background/80 backdrop-blur-md md:relative">
                <div className="m-auto max-w-5xl px-6">
                    <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <h1 className="text-2xl md:text-3xl font-bold display-font tracking-tight text-foreground">
                                    PC <span className="text-primary">GAMEFI</span>
                                </h1>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:pr-4">
                                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6 items-center">
                                <div className="flex items-center gap-3">
                                    {SOCIAL_LINKS.map((link) => (
                                        <a
                                            key={link.platform}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-accent"
                                            aria-label={link.platform}
                                        >
                                            {link.platform === 'Twitter' ? <Twitter size={20} /> : <Send size={20} />}
                                        </a>
                                    ))}
                                </div>
                                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-sm">
                                    <span className="font-bold text-xs sm:text-sm uppercase tracking-wide">Coming Soon</span>
                                </div>
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
