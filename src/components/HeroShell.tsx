import React from 'react';

type HeroShellProps = {
  bgImage: string;
  children: React.ReactNode;
  overlayTint?: string;
  overlayPrimary?: string;
  overlayDark?: string;
};

export default function HeroShell({
  bgImage,
  children,
  overlayTint = '#85542673',
  overlayPrimary = '#855426',
  overlayDark = '#6b401c',
}: HeroShellProps) {
  return (
    <section className="relative">
      <div
        className="relative min-h-[660px] sm:min-h-[700px] lg:min-h-[760px] overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: overlayTint }} />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${overlayPrimary}55, ${overlayDark}45, ${overlayDark}66)`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-20 sm:pt-24 pb-20">
          {children}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-white" />
      </div>
    </section>
  );
}