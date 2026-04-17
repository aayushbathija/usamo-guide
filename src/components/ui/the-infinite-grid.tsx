import classNames from 'classnames';
import * as React from 'react';
import {
  MotionValue,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';

function GridPattern({
  offsetX,
  offsetY,
}: {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) {
  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id="infinite-grid-pattern"
          x={offsetX}
          y={offsetY}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#infinite-grid-pattern)" />
    </svg>
  );
}

export const Component = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.35) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.35) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      className={classNames(
        'pointer-events-none absolute inset-0 overflow-hidden',
        'bg-[radial-gradient(circle_at_top,_rgba(112,66,138,0.24),_transparent_44%),radial-gradient(circle_at_bottom_right,_rgba(240,194,255,0.14),_transparent_30%)]'
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.08] text-white/70">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      <motion.div
        className="absolute inset-0 opacity-40 text-[#F0C2FF]"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0818]/30" />
    </div>
  );
};
