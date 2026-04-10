import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import * as React from 'react';

const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;

  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    mouse: { x: number | null; y: number | null; radius: number }
  ) {
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius + this.size && distance > 0) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouse.radius - distance) / mouse.radius;
        this.x -= forceDirectionX * force * 5;
        this.y -= forceDirectionY * force * 5;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw(ctx);
  }
}

export default function AetherFlowHero(): JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    const mouse = { x: null as number | null, y: null as number | null, radius: 200 };

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i += 1) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;
        const color = 'rgba(240, 194, 255, 0.78)';
        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      init();
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a += 1) {
        for (let b = a; b < particles.length; b += 1) {
          const distance =
            (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
            (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y);

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            const opacityValue = 1 - distance / 20000;
            const dxMouseA = particles[a].x - (mouse.x ?? 0);
            const dyMouseA = particles[a].y - (mouse.y ?? 0);
            const distanceMouseA = Math.sqrt(dxMouseA * dxMouseA + dyMouseA * dyMouseA);

            if (mouse.x !== null && distanceMouseA < mouse.radius) {
              ctx.strokeStyle = `rgba(247, 222, 255, ${opacityValue * 0.9})`;
            } else {
              ctx.strokeStyle = `rgba(184, 139, 208, ${opacityValue * 0.7})`;
            }

            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);
      ctx.fillStyle = '#0A0818';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i += 1) {
        particles[i].update(ctx, canvas, mouse);
      }
      connect();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fadeUp = (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: index * 0.16 + 0.3,
      duration: 0.72,
      ease: 'easeInOut' as const,
    },
  });

  return (
    <div
      ref={containerRef}
      data-page-tone="dark"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0A0818' }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(191,128,255,0.09),transparent_32%),radial-gradient(circle_at_24%_82%,rgba(112,66,138,0.12),transparent_32%),linear-gradient(180deg,rgba(10,8,24,0.55),rgba(12,10,28,0.84)_70%,rgba(6,5,16,0.96))]" />

      <div className="relative z-10 px-6 text-center">
        <motion.div
          {...fadeUp(0)}
          className="mb-6 inline-flex items-center rounded-full px-6 py-3 text-base font-extrabold tracking-wide"
          style={{
            border: '1px solid rgba(240, 194, 255, 0.26)',
            background: 'rgba(244, 237, 234, 0.10)',
            color: '#F4EDEA',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          Written by USAMO/JMO qualifiers.
        </motion.div>

        <motion.h1
          {...fadeUp(1)}
          className={cn(
            'mb-6 text-5xl font-bold tracking-tighter md:text-8xl',
            'bg-gradient-to-b from-white to-[#D9D2DF] bg-clip-text text-transparent'
          )}
        >
          A Clear Roadmap from
          <br />
          <span className="text-[#B88BD0]">
            AMC to Olympiad
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(2)}
          className="mx-auto mb-10 max-w-3xl text-lg text-[#F4EDEA]/80"
        >
          Structured topics, curated problems, and a clear path to Olympiad-level
          problem solving.
        </motion.p>

        <motion.div
          {...fadeUp(3)}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/dashboard"
            className="purple-motion-effect inline-flex items-center justify-center rounded-full px-6 py-3 md:px-8 md:py-3 text-lg font-bold leading-tight"
            style={{
              border: '1px solid rgba(112, 66, 138, 0.55)',
              background:
                'linear-gradient(135deg, #F7DEFF 0%, #70428A 55%, #F0C2FF 100%)',
              color: '#201C36',
              boxShadow: 'none',
            }}
          >
            Start Learning {'>'}
          </Link>
          <Link
            to="/foundations"
            className="purple-motion-effect inline-flex items-center justify-center rounded-[130px] px-4 py-2 md:px-6 md:py-3 text-lg font-bold"
            style={{
              border: '1px solid rgba(112, 66, 138, 0.55)',
              backgroundColor: '#70428A',
              color: '#F4EDEA',
              boxShadow: 'none',
            }}
          >
            Browse Topics
          </Link>
        </motion.div>

        <motion.div {...fadeUp(4)} className="mt-10 flex flex-col items-center gap-4">
          <span className="block text-center font-semibold text-[#F4EDEA]/78">
            Built by the USAMO Guide community
          </span>
          <div className="flex w-full flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="https://github.com/usamoguide/usamo-guide"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#F0C2FF] transition-colors hover:text-[#F7DEFF]"
            >
              Check out our GitHub →
            </a>
            <a
              href="https://discord.gg/X2zx6u53XH"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#F0C2FF] transition-colors hover:text-[#F7DEFF]"
            >
              Join our Discord server →
            </a>
            <a
              href="https://contests.usamoguide.com/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#F0C2FF] transition-colors hover:text-[#F7DEFF]"
            >
              Explore contests platform →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
