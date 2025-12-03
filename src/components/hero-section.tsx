'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, SendHorizonal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function HeroSection() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }

    return (
        <>
            <main>
                <section 
                    className="relative overflow-hidden"
                    onMouseMove={handleMouseMove}
                >
                    {/* Layer 1: Dashboard Image (Bottom) */}
                    <div className="absolute inset-0 z-0">
                        <div className="relative h-full w-full">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-full">
                                <Image
                                    src="/dashboard.png"
                                    alt="app illustration"
                                    fill
                                    className="object-contain object-right"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Layer 2: Interactive Background (Fade + Hole) */}
                    <div 
                        className="absolute inset-0 z-1 pointer-events-none"
                        style={{
                            maskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`,
                            WebkitMaskImage: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, black 100%)`
                        }}
                    >
                        <div 
                            className="absolute inset-0 bg-background"
                            style={{
                                maskImage: 'linear-gradient(to right, black 55%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, black 55%, transparent 100%)'
                            }}
                        />
                    </div>

                    {/* Layer 3: Text Contrast Overlay */}
                    <div className="absolute inset-0 z-2 pointer-events-none">
                         <div className="absolute inset-y-0 left-0 w-[80%] bg-gradient-to-r from-background via-background via-70% to-transparent" />
                    </div>

                    {/* Layer 4: Content (Top) */}
                    <div className="relative z-10 mx-auto max-w-5xl px-6 py-28 lg:py-20">
                        <div className="lg:flex lg:items-center lg:gap-12">
                            <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <Link
                                    href="/"
                                    className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3 lg:ml-0">
                                    <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">New</span>
                                    <span className="text-sm">Introduction Tailark Html</span>
                                    <span className="bg-(--color-border) block h-4 w-px"></span>

                                    <ArrowRight className="size-4" />
                                </Link>

                                <h1 className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-5xl">Production Ready Digital Marketing blocks</h1>
                                <p className="mt-8">Error totam sit illum. Voluptas doloribus asperiores quaerat aperiam. Quidem harum omnis beatae ipsum soluta!</p>

                                <div>
                                    <form
                                        action=""
                                        className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto">
                                        <div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
                                            <Mail className="text-caption pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />

                                            <input
                                                placeholder="Your mail address"
                                                className="h-14 w-full bg-transparent pl-12 focus:outline-none"
                                                type="email"
                                            />

                                            <div className="md:pr-1.5 lg:pr-0">
                                                <Button
                                                    aria-label="submit"
                                                    className="rounded-(--radius)">
                                                    <span className="hidden md:block">Get Started</span>
                                                    <SendHorizonal
                                                        className="relative mx-auto size-5 md:hidden"
                                                        strokeWidth={2}
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </form>

                                    <ul className="list-inside list-disc space-y-2">
                                        <li>Faster</li>
                                        <li>Modern</li>
                                        <li>100% Customizable</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
