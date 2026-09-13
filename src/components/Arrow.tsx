export function Arrow({
  direction = "up-right",
  className = "",
}: {
  direction?: "up-right" | "right" | "left" | "down";
  className?: string;
}) {
  const rotation = { "up-right": -45, right: 0, left: 180, down: 90 }[
    direction
  ];
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d="M4 12h15M12 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
