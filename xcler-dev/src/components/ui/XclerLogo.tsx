import { cn } from "@/lib/utils";

type XclerLogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
  priority?: boolean;
};

/** Signal-system wordmark — SVG for crisp LCP/logo SEO. */
export function XclerLogo({
  className,
  markClassName,
  wordmark = true,
}: XclerLogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5 text-cream", className)}
      aria-label="XCLER"
    >
      <svg
        viewBox="0 0 40 40"
        className={cn("h-8 w-8 shrink-0 md:h-9 md:w-9", markClassName)}
        aria-hidden="true"
        focusable="false"
      >
        <rect width="40" height="40" rx="4" fill="#10131a" />
        <path
          d="M10 8 L20 20 L10 32"
          fill="none"
          stroke="#2dff9a"
          strokeWidth="3.2"
          strokeLinecap="square"
        />
        <path
          d="M30 8 L20 20 L30 32"
          fill="none"
          stroke="#ff4d1c"
          strokeWidth="3.2"
          strokeLinecap="square"
        />
        <circle cx="20" cy="20" r="2.4" fill="#f2f4f7" />
      </svg>
      {wordmark ? (
        <span className="font-heading text-xl font-bold tracking-tight md:text-2xl">
          XCL<span className="text-sage">ER</span>
        </span>
      ) : null}
    </span>
  );
}
