'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

interface CarouselItem {
    id: number
    media: string
    alt: string
    title: string
    description: string
    color: string
    gradient: string
}

const items: CarouselItem[] = [
    {
        id: 1,
        media: '/gaming-gifs/robot-scifi.gif',
        alt: 'Sci-Fi Robot Gaming',
        title: 'Next-Gen GameFi Projects',
        description: 'Discover futuristic gaming projects pushing the boundaries of blockchain technology and immersive gameplay.',
        color: 'rgba(127, 242, 82, 0.3)',
        gradient: 'from-green-500/20 via-emerald-500/20 to-cyan-500/20'
    },
    {
        id: 2,
        media: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzNkMmY4ZjE2MGE2NTU5NWQxNzE4M2U5MTY5ZDk4ZjI5N2Y5OGRkOCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/26tn33aiTi1jkl6H6/giphy.gif',
        alt: 'Cyberpunk Gaming',
        title: 'Cyberpunk GameFi Universe',
        description: 'Step into a neon-lit metaverse where cutting-edge graphics meet decentralized gaming economics.',
        color: 'rgba(236, 72, 153, 0.3)',
        gradient: 'from-pink-500/20 via-purple-500/20 to-violet-500/20'
    },
    {
        id: 3,
        media: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Y4ZjE2NTU5NWQxNzE4M2U5MTY5ZDk4ZjI5N2Y5OGRkOCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/xTiTnxpQ3ghPiB2Hp6/giphy.gif',
        alt: 'Space Gaming',
        title: 'Cosmic Gaming Adventures',
        description: 'Launch into space-themed GameFi experiences with interstellar economies and galactic competitions.',
        color: 'rgba(59, 130, 246, 0.3)',
        gradient: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20'
    },
    {
        id: 4,
        media: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGZhMjY5MTY5ZDk4ZjI5N2Y5OGRkOCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3o7TKre2pXE2DeUVP2/giphy.gif',
        alt: 'Retro Gaming',
        title: 'Retro-Futurism Meets Web3',
        description: 'Classic arcade vibes reimagined with modern blockchain technology and play-to-earn mechanics.',
        color: 'rgba(168, 85, 247, 0.3)',
        gradient: 'from-purple-500/20 via-violet-500/20 to-fuchsia-500/20'
    },
    {
        id: 5,
        media: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzNkMmY4ZjE2MGE2NTU5NWQxNzE4M2U5MTY5ZDk4ZjI5N2Y5OGRkOCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l0HlNQ03J5JxX6lva/giphy.gif',
        alt: 'VR Gaming',
        title: 'Virtual Reality GameFi',
        description: 'Immerse yourself in VR-powered metaverse experiences with true digital ownership and rewards.',
        color: 'rgba(34, 211, 238, 0.3)',
        gradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20'
    },
    {
        id: 6,
        media: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGZhMjY5MTY5ZDk4ZjI5N2Y5OGRkOCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oKIPic2BnoVZkRla8/giphy.gif',
        alt: 'Action Gaming',
        title: 'High-Octane Action Games',
        description: 'Fast-paced competitive gaming meets blockchain rewards in adrenaline-fueled GameFi experiences.',
        color: 'rgba(239, 68, 68, 0.3)',
        gradient: 'from-red-500/20 via-orange-500/20 to-yellow-500/20'
    }
]

export default function Carousel3D() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [isPaused, setIsPaused] = useState(false)

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    }

    const handleDotClick = (index: number) => {
        setCurrentIndex(index)
    }

    const toggleAutoPlay = () => {
        setIsPaused(!isPaused)
        setIsAutoPlaying(!isAutoPlaying)
    }

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying || isPaused) return

        const interval = setInterval(() => {
            handleNext()
        }, 5000) // 5 seconds per slide

        return () => clearInterval(interval)
    }, [currentIndex, isAutoPlaying, isPaused])

    const getVisibleItems = (): { prev: CarouselItem; current: CarouselItem; next: CarouselItem } => {
        const prevIndex = (currentIndex - 1 + items.length) % items.length
        const nextIndex = (currentIndex + 1) % items.length
        return {
            prev: items[prevIndex]!,
            current: items[currentIndex]!,
            next: items[nextIndex]!
        }
    }

    const visible = getVisibleItems()

    return (
        <section
            data-theme="dark"
            className="relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5 py-24"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => !isPaused && setIsAutoPlaying(true)}
        >
            <h2 className="sr-only">PC GameFi Features Carousel</h2>

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-br ${visible.current?.gradient ?? 'from-primary/20 to-transparent'} opacity-30 blur-3xl`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:32px_32px]" />
            </div>

            <div className="container relative mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent px-2">
                        Explore the Gaming Universe
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Discover cutting-edge GameFi projects that blend immersive gameplay with blockchain innovation
                    </p>
                </div>

                {/* 3D Carousel Container */}
                <div className="relative h-[700px] w-full max-w-7xl mx-auto" style={{ perspective: '2000px' }}>
                    {/* Previous Card - Left */}
                    <motion.div
                        key={`prev-${visible.prev.id}`}
                        initial={{ opacity: 0, x: -200, rotateY: -45, scale: 0.7 }}
                        animate={{ opacity: 0.4, x: -100, rotateY: -35, scale: 0.75, z: -300 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[600px] pointer-events-none"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border/20 backdrop-blur-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={visible.prev.media}
                                alt={visible.prev.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Current Card - Center */}
                    <motion.div
                        key={`current-${visible.current.id}`}
                        initial={{ opacity: 0, scale: 0.8, rotateY: 0 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[700px]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="relative w-full h-full group">
                            {/* Card */}
                            <div className="relative h-full rounded-3xl overflow-hidden border-2 border-border/50 bg-card/30 backdrop-blur-xl shadow-2xl">
                                {/* GIF Background */}
                                <div className="absolute inset-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={visible.current.media}
                                        alt={visible.current.alt}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                                </div>

                                {/* Glow Effect */}
                                <div
                                    className="absolute inset-0 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at center, ${visible.current.color} 0%, transparent 70%)`
                                    }}
                                />

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-end p-12 z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    >
                                        <h3 className="text-4xl font-bold text-foreground mb-4 drop-shadow-lg">
                                            {visible.current.title}
                                        </h3>
                                        <p className="text-lg text-muted-foreground leading-relaxed drop-shadow-md">
                                            {visible.current.description}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Animated Border */}
                                <div className="absolute inset-0 rounded-3xl pointer-events-none">
                                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${visible.current.gradient} opacity-50 animate-pulse`} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Next Card - Right */}
                    <motion.div
                        key={`next-${visible.next.id}`}
                        initial={{ opacity: 0, x: 200, rotateY: 45, scale: 0.7 }}
                        animate={{ opacity: 0.4, x: 100, rotateY: 35, scale: 0.75, z: -300 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[600px] pointer-events-none"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border/20 backdrop-blur-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={visible.next.media}
                                alt={visible.next.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/50 bg-background/80 backdrop-blur-xl text-primary shadow-lg transition-all hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="h-7 w-7" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/50 bg-background/80 backdrop-blur-xl text-primary shadow-lg transition-all hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-7 w-7" />
                    </button>

                    {/* Play/Pause Button */}
                    <button
                        onClick={toggleAutoPlay}
                        className="absolute bottom-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border/50 bg-background/80 backdrop-blur-xl text-foreground shadow-lg transition-all hover:scale-110 hover:border-primary hover:bg-card"
                        aria-label={isPaused ? 'Play carousel' : 'Pause carousel'}
                    >
                        {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="mt-12 flex justify-center gap-3">
                    {items.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleDotClick(index)}
                            className={`h-3 rounded-full transition-all ${
                                index === currentIndex
                                    ? 'w-16 bg-primary shadow-lg shadow-primary/50'
                                    : 'w-3 bg-border hover:bg-primary/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Counter */}
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground text-lg">{currentIndex + 1}</span>
                    <span className="mx-2">/</span>
                    <span className="text-lg">{items.length}</span>
                </div>
            </div>
        </section>
    )
}
