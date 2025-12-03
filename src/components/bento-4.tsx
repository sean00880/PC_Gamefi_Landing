import { Card } from '@/components/ui/card'
import { ArrowBigRight, Equal } from 'lucide-react'
import { ReplyIllustration } from "@/components/reply-illustration"
import Image from 'next/image'

export default function BentoFour() {
    return (
        <section
            data-theme="dark"
            className="bg-background">
            <h2 className="sr-only">PC GameFi Features</h2>
            <div className="@container py-24">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <div className="@xl:grid-cols-2 @4xl:grid-cols-3 grid gap-4">
                        {/* Card 1 - Shield Security */}
                        <Card className="group grid grid-rows-[auto_1fr] gap-8 overflow-hidden rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                            <div className="relative flex items-center justify-center py-8">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl opacity-50"></div>
                                <Image
                                    src="/3d-icons/shield.png"
                                    alt="Security Shield"
                                    width={180}
                                    height={180}
                                    className="relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                                    style={{
                                        filter: 'drop-shadow(0 10px 30px rgba(127, 242, 82, 0.3))'
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className="text-foreground font-semibold text-lg">Secure Smart Contracts</h3>
                                <p className="text-muted-foreground mt-3">All IGOs are protected by audited smart contracts ensuring transparent and fair token distribution.</p>
                            </div>
                        </Card>

                        {/* Card 2 - Gaming */}
                        <Card className="group grid grid-rows-[1fr_auto] gap-8 overflow-hidden rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                            <div className="relative flex items-center justify-center py-12">
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-2xl opacity-50"></div>
                                <Image
                                    src="/3d-icons/gamepad.png"
                                    alt="Gaming Controller"
                                    width={220}
                                    height={220}
                                    className="relative z-10 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 drop-shadow-2xl"
                                    style={{
                                        filter: 'drop-shadow(0 10px 30px rgba(34, 211, 238, 0.3))'
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className="text-foreground font-semibold text-lg">High-Quality Game Projects</h3>
                                <p className="text-muted-foreground mt-3">Curated selection of premium GameFi projects with verified teams and innovative gameplay.</p>
                            </div>
                        </Card>

                        {/* Card 3 - Community */}
                        <Card className="grid grid-rows-[1fr_auto] gap-8 overflow-hidden rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                            <div className="@xl:aspect-auto bg-linear-to-b relative -m-8 flex aspect-video items-center p-8 [--color-background:var(--color-muted)]">
                                <div className="absolute -inset-x-6 inset-y-0 bg-[repeating-linear-gradient(-45deg,white,white_1px,transparent_1px,transparent_6px)] opacity-25 mix-blend-overlay [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                                <ReplyIllustration className="relative mt-0 w-full" />
                            </div>
                            <div>
                                <h3 className="text-foreground font-semibold text-lg">Community Driven</h3>
                                <p className="text-muted-foreground mt-3">Join a thriving community of gamers and investors shaping the future of GameFi together.</p>
                            </div>
                        </Card>

                        {/* Card 4 - Fair Allocation (Large Card) */}
                        <Card className="@xl:col-span-2 grid grid-rows-[1fr_auto] gap-8 rounded-2xl p-8 [--color-background:var(--color-muted)] hover:shadow-xl transition-all duration-300">
                            <div className="relative flex flex-col items-center justify-center py-8">
                                <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                                <div className="@lg:flex-row @4xl:aspect-auto flex aspect-video flex-col items-center gap-8 relative z-10">
                                    {/* Coins */}
                                    <div className="relative flex items-center justify-center group/icon">
                                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl"></div>
                                        <div className="relative p-6">
                                            <Image
                                                src="/3d-icons/treasure.png"
                                                alt="Treasure Chest"
                                                width={100}
                                                height={100}
                                                className="group-hover/icon:scale-110 group-hover/icon:rotate-12 transition-all duration-500"
                                                style={{
                                                    filter: 'drop-shadow(0 8px 20px rgba(127, 242, 82, 0.4))'
                                                }}
                                            />
                                        </div>
                                        <ArrowBigRight
                                            strokeWidth={4}
                                            className="fill-border stroke-border @lg:inset-y-0 @lg:right-0 @lg:my-auto @lg:translate-x-[120%] @lg:rotate-0 @xl:translate-y-0 absolute bottom-0 translate-x-[100%] translate-y-[150%] rotate-90"
                                        />
                                    </div>

                                    {/* Trophy */}
                                    <div className="relative flex items-center justify-center group/icon">
                                        <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl"></div>
                                        <div className="relative p-6">
                                            <Image
                                                src="/3d-icons/prize.png"
                                                alt="Trophy Rewards"
                                                width={100}
                                                height={100}
                                                className="group-hover/icon:scale-110 group-hover/icon:-rotate-6 transition-all duration-500"
                                                style={{
                                                    filter: 'drop-shadow(0 8px 20px rgba(34, 211, 238, 0.4))'
                                                }}
                                            />
                                        </div>
                                        <Equal
                                            strokeWidth={4}
                                            className="fill-border stroke-border @lg:inset-x-auto @lg:inset-y-0 @lg:right-0 @lg:my-auto @lg:translate-x-[120%] @xl:translate-y-0 absolute inset-x-0 bottom-0 mx-auto translate-y-[120%]"
                                        />
                                    </div>

                                    {/* Lightning/Crown */}
                                    <div className="relative flex items-center justify-center group/icon">
                                        <div className="absolute inset-0 bg-accent/10 rounded-full blur-xl"></div>
                                        <div className="relative p-6">
                                            <Image
                                                src="/3d-icons/crystal.png"
                                                alt="Premium Tier"
                                                width={100}
                                                height={100}
                                                className="group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-500"
                                                style={{
                                                    filter: 'drop-shadow(0 8px 20px rgba(192, 132, 252, 0.4))'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-foreground font-semibold text-lg">Fair Allocation System</h3>
                                <p className="text-muted-foreground mt-3">Quantum-tier allocation ensures early supporters and active community members get priority access to the best IGO opportunities.</p>
                            </div>
                        </Card>

                        {/* Card 5 & 6 Container */}
                        <div className="@xl:row-start-2 @4xl:row-start-auto @xl:space-y-0 @4xl:space-y-4 grid grid-rows-[1fr_auto] space-y-4">
                            {/* Card 5 - AI Analytics */}
                            <Card className="group grid grid-rows-[1fr_auto] gap-8 overflow-hidden rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                                <div className="relative flex items-center justify-center py-8">
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl opacity-50"></div>
                                    <Image
                                        src="/3d-icons/joystick.png"
                                        alt="AI Analytics"
                                        width={160}
                                        height={160}
                                        className="relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 drop-shadow-2xl"
                                        style={{
                                            filter: 'drop-shadow(0 10px 30px rgba(192, 132, 252, 0.3))'
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-foreground font-semibold text-lg">AI-Powered Analytics</h3>
                                    <p className="text-muted-foreground mt-3">Advanced AI algorithms analyze projects and provide risk scores for informed investment decisions.</p>
                                </div>
                            </Card>

                            {/* Card 6 - ROI Stat */}
                            <Card className="@4xl:block @xl:hidden group space-y-4 overflow-hidden rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
                                <span className="to-primary block bg-gradient-to-r from-emerald-400 bg-clip-text text-5xl font-bold text-transparent" style={{
                                    filter: 'drop-shadow(0 0 10px rgba(127, 242, 82, 0.3))'
                                }}>42.5x</span>
                                <div>
                                    <p className="text-foreground font-semibold">Average ROI</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
