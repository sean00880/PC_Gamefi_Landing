'use client'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
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
                                    href="/stake"
                                    className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3 lg:ml-0">
                                    <span className="bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">Live</span>
                                    <span className="text-sm">Staking Now Available</span>
                                    <span className="bg-(--color-border) block h-4 w-px"></span>

                                    <ArrowRight className="size-4" />
                                </Link>

                                <h1 className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-5xl">Your Gateway to Play-to-Earn Gaming</h1>
                                <p className="mt-8">Discover, play, and earn with PC GameFi. Stake your tokens, participate in tournaments, and unlock exclusive rewards across the most exciting blockchain games.</p>

                                <div>
                                    <div className="mx-auto my-10 flex flex-col sm:flex-row gap-4 lg:my-12 lg:ml-0 lg:mr-auto max-w-sm">
                                        <Button size="lg" className="flex-1">
                                            Launch App
                                            <ArrowRight className="ml-2 size-4" />
                                        </Button>
                                        <Button size="lg" variant="outline" className="flex-1">
                                            View Games
                                        </Button>
                                    </div>

                                    <ul className="list-inside list-disc space-y-2">
                                        <li>Stake & Earn Rewards</li>
                                        <li>Cross-Chain Gaming</li>
                                        <li>NFT Marketplace</li>
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
