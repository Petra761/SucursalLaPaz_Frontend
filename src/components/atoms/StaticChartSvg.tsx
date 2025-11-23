export function StaticChartSvg() {
  return (
    <div className="h-80 w-full">
      <svg
        fill="none"
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 500 200"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M0 150 L50 120 L100 140 L150 100 L200 120 L250 80 L300 100 L350 70 L400 90 L450 60 L500 80"
          fill="none"
          stroke="#E74C3C"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M0 100 L50 80 L100 90 L150 50 L200 70 L250 30 L300 50 L350 20 L400 40 L450 10 L500 30"
          fill="none"
          stroke="#4A90E2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          className="stroke-border-color-light dark:stroke-border-color-dark"
          d="M0 190 H500"
          strokeWidth="1"
        />
        <path
          className="stroke-border-color-light dark:stroke-border-color-dark"
          d="M0 142.5 H500"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <path
          className="stroke-border-color-light dark:stroke-border-color-dark"
          d="M0 95 H500"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <path
          className="stroke-border-color-light dark:stroke-border-color-dark"
          d="M0 47.5 H500"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <path
          className="stroke-border-color-light dark:stroke-border-color-dark"
          d="M0 0 H500"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
