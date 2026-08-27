/* ================= LOGO MARK (SVG) ================= */
/* A leaf-in-wave glyph inside a solid circle — evokes sustainability +
   sailing without needing an external asset. Reused as-is on both light
   (Navbar) and dark (Footer) backgrounds since the circle carries its own
   brand fill. */
export const LogoMark = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="20" fill="#1F6F63" />
    <path
      d="M13 24c2-6 7-9 13-9-1 6-4 11-10 12.5-1.7.4-3.4-1.4-3-3.5Z"
      fill="#EAF5F3"
    />
    <path
      d="M9 27c5.5 1.5 11 1.5 16.5-2"
      stroke="#EAF5F3"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/* ================= LOGO (MARK + WORDMARK) ================= */
const SIZES = {
  sm: { icon: "w-7 h-7", text: "text-lg" },
  md: { icon: "w-9 h-9", text: "text-xl" },
  lg: { icon: "w-11 h-11", text: "text-2xl" },
} as const;

interface LogoProps {
  variant?: "dark" | "light";
  size?: keyof typeof SIZES;
  className?: string;
}

const Logo = ({ variant = "dark", size = "md", className = "" }: LogoProps) => {
  const { icon, text } = SIZES[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={icon} />
      <span
        className={`relative font-bold leading-none whitespace-nowrap tracking-tight ${text} ${
          variant === "dark" ? "text-brand-900" : "text-white"
        }`}
      >
        Travelpark
        <span
          className={`absolute -right-2 -top-1 h-1.5 w-1.5 rounded-full ${
            variant === "dark" ? "bg-gold-500" : "bg-gold-400"
          }`}
        />
      </span>
    </span>
  );
};

export default Logo;
