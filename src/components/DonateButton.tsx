/** Shared donation link, styled from the supplied heart-in-hands reference. */
export function DonateButton({ className = "" }: { className?: string }) {
  return (
    <a className={`donate-button ${className}`} href="./donate.html">
      <svg
        className="donate-button-icon"
        viewBox="0 0 48 48"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 26.5 12.4 15.8C5 8.8 15.6.2 24 9c8.4-8.8 19-.2 11.6 6.8L24 26.5Z" />
        <path d="M7 22.5a2.3 2.3 0 0 0-4.5.9l2.1 10.2a10 10 0 0 0 3.8 5.8l7.3 5.5V48h6V37a6 6 0 0 0-2.1-4.5L12.2 26a2.3 2.3 0 0 0-3.1 3.4l6.7 6a1 1 0 0 1-1.3 1.5L8.4 32a5 5 0 0 1-1.7-2.7L7 22.5Zm34 0a2.3 2.3 0 0 1 4.5.9l-2.1 10.2a10 10 0 0 1-3.8 5.8l-7.3 5.5V48h-6V37a6 6 0 0 1 2.1-4.5l7.4-6.5a2.3 2.3 0 0 1 3.1 3.4l-6.7 6a1 1 0 0 0 1.3 1.5l6.1-4.9a5 5 0 0 0 1.7-2.7l-.3-6.8Z" />
      </svg>
      <span className="donate-button-divider" aria-hidden="true" />
      <span>Donate Now</span>
      <svg
        className="donate-button-chevron"
        viewBox="0 0 20 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m7 5 7 7-7 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
