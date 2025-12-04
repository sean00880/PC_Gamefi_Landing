import { Navbar } from '@/components/Navbar'
import {
  Hero100vh,
  Tokenomics100vh,
  Footer100vh
} from '@/components/sections'
import BentoFour from '@/components/bento-4'
import Carousel3D from '@/components/carousel-3d'
import HeroSection from '@/components/hero-section'

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />

      {/* 100vh Hero Section */}
      <Hero100vh />

      {/* Secondary Hero Section */}
      <HeroSection />

      {/* 100vh Tokenomics Section */}
      <Tokenomics100vh />

      {/* Features Bento Grid */}
      <BentoFour />

      {/* 3D Features Carousel */}
      <Carousel3D />

      {/* Roadmap Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 display-font">The Future of GameFi is Coming</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            PC GameFi is building the next generation launchpad for high-quality gaming projects.
            Our platform combines AI-powered analytics, fair allocation systems, and sustainable tokenomics
            to deliver unmatched value to our community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-card rounded-xl shadow-sm border border-border ring-2 ring-primary">
              <div className="text-primary font-bold text-3xl mb-2">Q4 2025</div>
              <div className="font-semibold mb-1">Platform Launch</div>
              <div className="text-sm text-muted-foreground">Official $PC token launch</div>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-sm border border-border">
              <div className="text-primary font-bold text-3xl mb-2">Q1 2026</div>
              <div className="font-semibold mb-1">IGO Launchpad</div>
              <div className="text-sm text-muted-foreground">First gaming projects go live</div>
            </div>
            <div className="p-6 bg-card rounded-xl shadow-sm border border-border">
              <div className="text-primary font-bold text-3xl mb-2">Q2 2026</div>
              <div className="font-semibold mb-1">Full Ecosystem</div>
              <div className="text-sm text-muted-foreground">NFT marketplace & tournaments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer100vh />
    </main>
  )
}
