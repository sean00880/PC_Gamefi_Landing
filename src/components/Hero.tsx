'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './Button';
import { ArrowRight, Twitter, Send, ChevronLeft, ChevronRight, Rocket, BrainCircuit, Coins, type LucideIcon } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

type Theme = 'quantum' | 'agi' | 'compute';

interface SlideData {
  id: Theme;
  title: React.ReactNode;
  subtitle: string;
  tag: string;
  colors: {
    primary: string;
    secondary: string;
    bg: string;
    accent: string;
  };
  icon: LucideIcon;
}

// Slides use CSS variables defined in globals.css for consistent theming
const SLIDES: SlideData[] = [
  {
    id: 'quantum',
    title: <>Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Launchpad</span></>,
    subtitle: "Access high-quality IGOs through our quantum-tier allocation system. Fair, transparent, and built for the future of Web3 gaming.",
    tag: "GameFi Core",
    colors: {
      primary: 'var(--slide-quantum-primary)',
      secondary: 'var(--slide-quantum-secondary)',
      bg: 'var(--slide-quantum-bg)',
      accent: 'var(--slide-quantum-accent)'
    },
    icon: Rocket
  },
  {
    id: 'agi',
    title: <>AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-500">Scout</span></>,
    subtitle: "Leverage our proprietary neural networks to analyze project metrics, tokenomics, and community sentiment in real-time.",
    tag: "Smart Analysis",
    colors: {
      primary: 'var(--slide-agi-primary)',
      secondary: 'var(--slide-agi-secondary)',
      bg: 'var(--slide-agi-bg)',
      accent: 'var(--slide-agi-accent)'
    },
    icon: BrainCircuit
  },
  {
    id: 'compute',
    title: <>Staking & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-fuchsia-500">Rewards</span></>,
    subtitle: "Maximize your yield by staking $PC tokens. Power the ecosystem's compute layer and earn passive income from platform fees.",
    tag: "Infrastructure",
    colors: {
      primary: 'var(--slide-compute-primary)',
      secondary: 'var(--slide-compute-secondary)',
      bg: 'var(--slide-compute-bg)',
      accent: 'var(--slide-compute-accent)'
    },
    icon: Coins
  }
];

const HeroCanvas: React.FC<{ theme: Theme }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let width = rect.width;
    let height = rect.height;

    const handleResize = () => {
      const newRect = canvas.getBoundingClientRect();
      canvas.width = newRect.width * dpr;
      canvas.height = newRect.height * dpr;
      ctx.scale(dpr, dpr);
      width = newRect.width;
      height = newRect.height;
    };
    window.addEventListener('resize', handleResize);

    const project3D = (x: number, y: number, z: number, perspective: number = 500) => {
      const scale = perspective / (perspective + z);
      const x2d = (x * scale) + width / 2;
      const y2d = (y * scale) + height / 2;
      return { x: x2d, y: y2d, scale };
    };

    const particles: any[] = [];

    if (theme === 'quantum') {
      for (let i = 0; i < 300; i++) {
        particles.push({
          angle: Math.random() * Math.PI * 2,
          radius: 30 + Math.random() * 100,
          speed: 0.01 + Math.random() * 0.05,
          yOffset: (Math.random() - 0.5) * 50,
          colorVar: Math.random()
        });
      }
    } else if (theme === 'agi') {
      for (let i = 0; i < 80; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 250 + Math.random() * 50;
        particles.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
          connections: [],
          pulse: Math.random() * Math.PI
        });
      }
    } else if (theme === 'compute') {
      const gridSize = 14;
      const spacing = 40;
      for (let x = -gridSize; x <= gridSize; x++) {
        for (let z = -gridSize; z <= gridSize; z++) {
          if (Math.abs(x) + Math.abs(z) < gridSize + 5) {
            particles.push({
              gridX: x,
              gridZ: z,
              x: x * spacing,
              z: z * spacing,
              y: 0,
              offset: Math.sqrt(x * x + z * z)
            });
          }
        }
      }
    }

    const animate = () => {
      timeRef.current += 0.015;
      const time = timeRef.current;

      ctx.fillStyle = theme === 'quantum' ? '#020602' :
        theme === 'agi' ? '#040B14' : '#0F0318';
      ctx.fillRect(0, 0, width, height);

      ctx.save();

      if (theme === 'quantum') {
        ctx.globalCompositeOperation = 'lighter';

        const centerP = project3D(0, 0, 0);
        const grad = ctx.createRadialGradient(centerP.x, centerP.y, 0, centerP.x, centerP.y, 150);
        grad.addColorStop(0, 'rgba(127, 242, 82, 0.4)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerP.x, centerP.y, 150, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((p, i) => {
          p.angle += p.speed;

          const ringIndex = i % 3;
          let x, y, z;
          const r = p.radius;
          const a = p.angle;

          if (ringIndex === 0) {
            x = Math.cos(a) * r;
            z = Math.sin(a) * r;
            y = Math.sin(a * 2 + time) * 20;
          } else if (ringIndex === 1) {
            x = Math.cos(a) * r;
            y = Math.sin(a) * r;
            z = Math.sin(a * 3) * 30;
            const tilt = 0.5;
            const y_t = y * Math.cos(tilt) - z * Math.sin(tilt);
            const z_t = y * Math.sin(tilt) + z * Math.cos(tilt);
            y = y_t; z = z_t;
          } else {
            x = Math.cos(a) * r;
            y = Math.sin(a) * r;
            z = Math.sin(a * 2) * 30;
            const tilt = -0.5;
            const y_t = y * Math.cos(tilt) - z * Math.sin(tilt);
            const z_t = y * Math.sin(tilt) + z * Math.cos(tilt);
            y = y_t; z = z_t;
          }

          const camRot = time * 0.2;
          const x_c = x * Math.cos(camRot) - z * Math.sin(camRot);
          const z_c = x * Math.sin(camRot) + z * Math.cos(camRot);

          const proj = project3D(x_c, y, z_c);

          if (proj.scale > 0) {
            const alpha = (proj.scale - 0.5) * 2;
            ctx.fillStyle = p.colorVar > 0.5 ? `rgba(127, 242, 82, ${alpha})` : `rgba(111, 214, 56, ${alpha})`;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, (1.5 * proj.scale) + (Math.sin(time * 5 + i) * 0.5), 0, Math.PI * 2);
            ctx.fill();
          }
        });

      } else if (theme === 'agi') {
        ctx.lineWidth = 1;

        const rotY = time * 0.15;
        const rotX = Math.sin(time * 0.1) * 0.1;

        const projectedNodes: any[] = [];

        particles.forEach(p => {
          let x = p.x; let y = p.y; let z = p.z;

          let x2 = x * Math.cos(rotY) - z * Math.sin(rotY);
          let z2 = x * Math.sin(rotY) + z * Math.cos(rotY);
          x = x2; z = z2;

          let y2 = y * Math.cos(rotX) - z * Math.sin(rotX);
          z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
          y = y2; z = z2;

          const proj = project3D(x, y, z, 600);
          projectedNodes.push({ x: proj.x, y: proj.y, z: z, scale: proj.scale, pulse: p.pulse });

          if (proj.scale > 0) {
            const alpha = Math.min(1, Math.max(0.1, proj.scale));
            ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, 2 * proj.scale, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        ctx.globalCompositeOperation = 'screen';
        const scanZ = Math.sin(time) * 300;

        for (let i = 0; i < projectedNodes.length; i++) {
          const n1 = projectedNodes[i];
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const n2 = projectedNodes[j];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 15000 && n1.scale > 0 && n2.scale > 0) {
              ctx.strokeStyle = `rgba(34, 211, 238, ${0.05 * n1.scale})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();

              const packetPhase = (time * 2 + i * 0.1) % (Math.PI * 2);
              if (packetPhase > 0 && packetPhase < 0.5) {
                const progress = packetPhase * 2;
                const px = n1.x + (n2.x - n1.x) * progress;
                const py = n1.y + (n2.y - n1.y) * progress;

                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(px, py, 1.5 * n1.scale, 0, Math.PI * 2);
                ctx.fill();
              }

              if (Math.abs(n1.z - scanZ) < 20) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * n1.scale})`;
                ctx.lineWidth = 2 * n1.scale;
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.stroke();
              }
            }
          }
        }

      } else if (theme === 'compute') {
        const camRot = Math.PI / 4;
        const tilt = 0.6;

        particles.forEach(p => {
          const dist = Math.sqrt(p.gridX * p.gridX + p.gridZ * p.gridZ);
          const h = Math.sin(dist * 0.3 - time * 2) * 20 + Math.sin(p.gridX * 0.5 + time) * 15;

          let x = p.x;
          let z = p.z;
          let y = h - 60;

          const x_r = x * Math.cos(camRot) - z * Math.sin(camRot);
          const z_r = x * Math.sin(camRot) + z * Math.cos(camRot);

          const y_cam = y * Math.cos(tilt) - z_r * Math.sin(tilt);
          const z_cam = y * Math.sin(tilt) + z_r * Math.cos(tilt);

          const proj = project3D(x_r, y_cam, z_cam, 800);
          const size = 28 * proj.scale;
          const halfSize = size / 2;

          if (proj.scale > 0) {
            const hue = 270 + (h * 2);
            const colorTop = `hsla(${hue}, 80%, 60%, ${0.2 + (h + 40) / 100})`;
            const colorSide = `hsla(${hue}, 60%, 30%, ${0.5})`;
            const colorEdge = `hsla(${hue}, 90%, 70%, 0.8)`;

            const topY = proj.y - halfSize;

            ctx.beginPath();
            ctx.moveTo(proj.x, topY - halfSize * 0.6);
            ctx.lineTo(proj.x + halfSize, topY);
            ctx.lineTo(proj.x, topY + halfSize * 0.6);
            ctx.lineTo(proj.x - halfSize, topY);
            ctx.closePath();
            ctx.fillStyle = colorTop;
            ctx.fill();
            ctx.strokeStyle = colorEdge;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            const pillarHeight = 100 * proj.scale + h;
            if (pillarHeight > 0) {
              const grad = ctx.createLinearGradient(0, topY, 0, topY + pillarHeight);
              grad.addColorStop(0, colorSide);
              grad.addColorStop(1, 'transparent');

              ctx.fillStyle = grad;
              ctx.fillRect(proj.x - 2, topY, 4, pillarHeight);
            }
          }
        });
      }

      ctx.restore();
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const current = SLIDES[activeSlide]!;
  const Icon = current.icon;

  const openSocial = (url: string) => window.open(url, '_blank');

  return (
    <div className="relative h-[700px] md:h-[800px] w-full overflow-hidden bg-background text-foreground transition-colors duration-1000" style={{ backgroundColor: current.colors.bg }}>

      <div className="absolute inset-0 z-0">
        <HeroCanvas theme={current.id} />
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(to right, ${current.colors.bg} 10%, rgba(0,0,0,0.6) 50%, transparent 100%)`
        }}
      ></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">

        <div key={activeSlide} className="max-w-3xl animate-slide-up">

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-opacity-20 backdrop-blur-md mb-8 transition-colors duration-500"
            style={{
              borderColor: current.colors.primary,
              backgroundColor: current.colors.accent
            }}
          >
            <Icon size={16} style={{ color: current.colors.primary }} />
            <span className="text-sm font-bold tracking-wider uppercase" style={{ color: current.colors.primary }}>
              {current.tag}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 display-font tracking-tight text-white">
            {current.title}
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-white/70 mb-10 max-w-2xl leading-relaxed font-light">
            {current.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="min-w-[200px] text-lg font-bold cursor-not-allowed"
              disabled
              style={{
                backgroundColor: current.colors.primary,
                color: 'black',
                boxShadow: `4px 4px 0px 0px ${current.colors.secondary}`,
                opacity: 0.95
              }}
            >
              Coming Soon <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-12 opacity-80">
            {SOCIAL_LINKS.map(link => (
              <button
                key={link.platform}
                onClick={() => openSocial(link.url)}
                className="p-2 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/50 transition-all text-white/70 hover:text-white hover:scale-110"
              >
                {link.platform === 'Twitter' ? <Twitter size={20} /> : <Send size={20} />}
              </button>
            ))}
          </div>

        </div>

      </div>

      <div className="absolute bottom-12 right-4 md:right-12 z-30 flex items-center gap-6">
        <div className="flex gap-3">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeSlide ? 'w-12 opacity-100' : 'w-2 opacity-30 hover:opacity-60'
                }`}
              style={{ backgroundColor: current.colors.primary }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm group"
          >
            <ChevronLeft className="group-hover:-translate-x-1 transition-transform text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm group"
          >
            <ChevronRight className="group-hover:translate-x-1 transition-transform text-white" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-8 md:right-16 z-20 text-[10px] uppercase tracking-widest text-white/20 hidden md:block">
        Use Arrow Keys to Navigate
      </div>

    </div>
  );
};
