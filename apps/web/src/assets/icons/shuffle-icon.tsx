export default function ShuffleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
      <g clipPath="url(#a)">
        <path
          stroke="#A3E635"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M22.75 18.667 25 20.833 22.75 23m0-13L25 12.167l-2.25 2.166M7 20.833h3.993c.618 0 1.225-.146 1.77-.427a3.704 3.704 0 0 0 1.35-1.18L16 16.5"
        />
        <path
          stroke="#A3E635"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 11.53h4.158c.643 0 1.276.168 1.843.49.567.321 1.05.786 1.406 1.354l3.93 6.252c.356.568.84 1.033 1.406 1.354.567.322 1.2.49 1.843.49h2.596m0-9.94h-2.596c-.643 0-1.276.168-1.843.49a3.998 3.998 0 0 0-1.406 1.354l-.403.64"
        />
        <rect width={32} height={32} fill="#A3E635" fillOpacity={0.2} rx={8} />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h32v32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
