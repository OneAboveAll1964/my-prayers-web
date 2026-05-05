export function IconNinetyNine({ size = 22, strokeWidth = 1.9, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="6.5" cy="9" r="3.5" />
      <path d="M10 9.4c-.4 4.5-2.4 8-5.5 9.6" />
      <circle cx="17.5" cy="9" r="3.5" />
      <path d="M21 9.4c-.4 4.5-2.4 8-5.5 9.6" />
    </svg>
  )
}
