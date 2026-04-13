import { Link } from 'gatsby';
import * as React from 'react';

export default function AetherFlowHero(): JSX.Element {
  const subtitles = React.useMemo(
    () => [
      'A structured pathway for learning competition maths.',
      'Curated topics from AMC foundations to Olympiad depth.',
      'Learn faster with battle-tested problem-solving tracks.',
      'Train with purpose, not guesswork.',
    ],
    []
  );

  const [subtitleIndex, setSubtitleIndex] = React.useState(0);
  const [typedSubtitle, setTypedSubtitle] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = subtitles[subtitleIndex];

    if (!isDeleting && typedSubtitle === current) {
      const holdTimer = window.setTimeout(() => setIsDeleting(true), 1300);
      return () => window.clearTimeout(holdTimer);
    }

    if (isDeleting && typedSubtitle.length === 0) {
      setIsDeleting(false);
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
      return;
    }

    const speed = isDeleting ? 36 : 64;
    const timer = window.setTimeout(() => {
      setTypedSubtitle((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, speed);

    return () => window.clearTimeout(timer);
  }, [isDeleting, subtitleIndex, subtitles, typedSubtitle]);

  return (
    <div
      data-page-tone="dark"
      className="relative flex min-h-screen w-full flex-col overflow-hidden pt-20"
      style={{ backgroundColor: '#0A0818' }}
    >
      <div
        className="pointer-events-none absolute inset-0 scale-105 blur-[2px]"
        style={{
          backgroundImage: "url('/images/Hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* ── Top bar ── */}
      <div className="relative z-10 flex w-full items-center justify-between px-10 py-8">
        <a
          href="https://github.com/usamoguide/usamo-guide"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#F5F0FA] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-opacity hover:opacity-70"
        >
          {/* GitHub icon */}
          <svg viewBox="0 0 16 16" className="h-4 w-4 flex-shrink-0 fill-current" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
              .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
              -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
              .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
              .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
              0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          HTTPS://GITHUB.COM/USAMOGUIDE/USAMO-GUIDE
        </a>

        <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#F5F0FA] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {'<- '}WE ARE{' '}
          <strong className="font-bold text-[#FBF7FF]">OPEN SOURCE</strong>
          !! STAR US ON GITHUB IF YOU THINK MATH IS COOL ;)
        </p>
      </div>

      {/* ── Center content ── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-end md:gap-6">
          <h1 className="font-mono text-5xl font-extrabold tracking-tight text-[#F5F0FA] md:text-7xl lg:text-8xl">
            A Clear Roadmap from
            <br />
            AMC to Olympiad
          </h1>
        </div>

        <p className="mt-5 min-h-[2.25rem] font-mono text-xl font-semibold text-[#F1EAF7] md:min-h-[2.5rem] md:text-2xl">
          {typedSubtitle}
          <span className="ml-1 inline-block h-[1.05em] w-[0.09em] animate-pulse bg-[#F1EAF7] align-[-0.15em]" />
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="purple-motion-effect inline-flex items-center justify-center rounded-full px-6 py-3 md:px-8 md:py-3 font-mono text-lg font-bold leading-tight"
            style={{
              border: '1px solid rgba(240, 194, 255, 0.34)',
              background: '#171413',
              boxShadow: 'none',
              '--pme-color': '#F4EDEA',
              '--pme-hover-color': '#201C36',
              '--pme-wipe-bg': '#F0C2FF',
            } as React.CSSProperties}
          >
            Start Learning &gt;
          </Link>
          <Link
            to="/foundations"
            className="purple-motion-effect inline-flex items-center justify-center rounded-[130px] px-4 py-2 md:px-6 md:py-3 font-mono text-lg font-bold"
            style={{
              border: '1px solid rgba(240, 194, 255, 0.34)',
              backgroundColor: '#171413',
              boxShadow: 'none',
              '--pme-color': '#F4EDEA',
              '--pme-hover-color': '#201C36',
              '--pme-wipe-bg': '#F0C2FF',
            } as React.CSSProperties}
          >
            Browse Topics
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 flex w-full items-end justify-between px-12 pb-12 pt-6">
        {/* Bottom-left: written by */}
        <div className="font-mono uppercase text-[#F5F0FA] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
          <p className="text-base font-bold tracking-widest md:text-lg">Written By</p>
          <p className="text-3xl font-extrabold tracking-widest md:text-5xl">AIME/AMO</p>
          <p className="text-base font-bold tracking-widest md:text-lg">Quals!</p>
        </div>

        {/* Bottom-right: Discord */}
        <a
          href="https://discord.gg/X2zx6u53XH"
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-2 text-right font-mono text-xs font-bold uppercase tracking-widest text-[#F5F0FA] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] transition-opacity hover:opacity-70"
        >
          <div className="text-right">
            <p>Let&apos;s love maths together!</p>
            <p>Join the Discord server :)</p>
            <p className="mt-1 text-white/50">https://discord.gg/X2zx6u53XH</p>
          </div>
          {/* Discord icon */}
          <svg viewBox="0 0 71 55" className="mt-0.5 h-4 w-4 flex-shrink-0 fill-current" aria-hidden="true">
            <path d="M60.1 4.9A58.5 58.5 0 0045.7.8a.2.2 0 00-.2.1 40.7 40.7 0 00-1.8 3.7
              -13.9 0-27.7 0-41.5.1a.2.2 0 00-.2.1A40.6 40.6 0 000 8.2C-.1 8.3 0 8.5.1 8.6
              a57.9 57.9 0 0014.4 4.1.2.2 0 00.2-.1 42.2 42.2 0 003.6-5.8.2.2 0 00-.1-.3
              -1.9-.7-3.8-1.5-5.5-2.4a.2.2 0 010-.4c.4-.3.7-.5 1.1-.8a.2.2 0 01.2 0
              c11.5 5.3 24 5.3 35.4 0a.2.2 0 01.2 0c.4.3.8.5 1.1.8a.2.2 0 010 .4
              -1.8.9-3.6 1.7-5.5 2.4a.2.2 0 00-.1.3 47.4 47.4 0 003.6 5.8.2.2 0 00.2.1
              A58 58 0 0071 8.6a.2.2 0 000-.2A58.3 58.3 0 0060.1 4.9zM23.7 36.3
              c-3 0-5.4-2.7-5.4-6.1s2.4-6.1 5.4-6.1 5.5 2.7 5.4 6.1c0 3.4-2.4 6.1-5.4 6.1z
              m20 0c-3 0-5.4-2.7-5.4-6.1s2.4-6.1 5.4-6.1 5.5 2.7 5.4 6.1c0 3.4-2.4 6.1-5.4 6.1z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
