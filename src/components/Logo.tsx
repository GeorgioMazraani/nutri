// Logo.tsx
import logo from '../assets/Logo.png';

interface LogoProps {
  dark?: boolean;
  onClick?: () => void;
}

export default function Logo({ dark = false, onClick }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0"
      aria-label="Go to homepage"
    >
      <img
        src={logo}
        alt="Nutri"
        className={`
          object-contain
          h-10 sm:h-11 md:h-12 lg:h-12
          w-auto
          ${dark ? 'brightness-0 invert' : ''}
        `}
      />
    </button>
  );
}