import type { SVGProps } from 'react'

/**
 * Conjunto de ícones desenhado à mão (stroke 1.6, grade 24).
 * Zero dependência externa e peso desprezível no bundle.
 */

type P = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 20, children, ...rest }: P) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  )
}

export const IconHome = (p: P) => (
  <Svg {...p}>
    <path d="M4 11.2 12 4l8 7.2" />
    <path d="M6 10v9.2h12V10" />
  </Svg>
)

export const IconRoute = (p: P) => (
  <Svg {...p}>
    <circle cx="6" cy="5.5" r="2.2" />
    <circle cx="18" cy="18.5" r="2.2" />
    <path d="M6 7.7v4.6a3.2 3.2 0 0 0 3.2 3.2h5.6a3.2 3.2 0 0 1 3.2 3" />
  </Svg>
)

export const IconGrid = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
  </Svg>
)

export const IconPeople = (p: P) => (
  <Svg {...p}>
    <circle cx="9.5" cy="8" r="3.2" />
    <path d="M3.8 19.5c.5-3.1 2.9-5 5.7-5s5.2 1.9 5.7 5" />
    <path d="M16 5.2a3.2 3.2 0 0 1 0 6.1M17.4 14.9c2 .6 3.4 2.3 3.8 4.6" />
  </Svg>
)

export const IconGauge = (p: P) => (
  <Svg {...p}>
    <path d="M4 17.5a8.5 8.5 0 1 1 16 0" />
    <path d="m12 13.5 4-3.6" />
    <circle cx="12" cy="17.5" r="1.4" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconLink = (p: P) => (
  <Svg {...p}>
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="18" cy="6.5" r="2.4" />
    <circle cx="18" cy="17.5" r="2.4" />
    <path d="m8.2 10.9 7.6-3.3M8.2 13.1l7.6 3.3" />
  </Svg>
)

export const IconCheck = (p: P) => (
  <Svg {...p}>
    <path d="m5 12.5 4.6 4.4L19 6.8" />
  </Svg>
)

export const IconPlay = (p: P) => (
  <Svg {...p}>
    <path d="M8 5.5v13l10-6.5z" fill="currentColor" stroke="none" />
  </Svg>
)

export const IconUndo = (p: P) => (
  <Svg {...p}>
    <path d="M4 9h9.5a5.5 5.5 0 1 1 0 11H8" />
    <path d="M7.5 5.5 4 9l3.5 3.5" />
  </Svg>
)

export const IconSearch = (p: P) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="m16 16 4 4" />
  </Svg>
)

export const IconClose = (p: P) => (
  <Svg {...p}>
    <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
  </Svg>
)

export const IconChevron = (p: P) => (
  <Svg {...p}>
    <path d="m9 5.5 6.5 6.5L9 18.5" />
  </Svg>
)

export const IconArrowLeft = (p: P) => (
  <Svg {...p}>
    <path d="M19 12H5.5M11 5.5 4.5 12l6.5 6.5" />
  </Svg>
)

export const IconShare = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5v11" />
    <path d="m8 7 4-3.5L16 7" />
    <path d="M5.5 12.5v6a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-6" />
  </Svg>
)

export const IconEye = (p: P) => (
  <Svg {...p}>
    <path d="M2.8 12S6.6 5.8 12 5.8 21.2 12 21.2 12 17.4 18.2 12 18.2 2.8 12 2.8 12Z" />
    <circle cx="12" cy="12" r="2.8" />
  </Svg>
)

export const IconLock = (p: P) => (
  <Svg {...p}>
    <rect x="4.8" y="10.5" width="14.4" height="9.5" rx="2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Svg>
)

export const IconSun = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
  </Svg>
)

export const IconMoon = (p: P) => (
  <Svg {...p}>
    <path d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z" />
  </Svg>
)

export const IconFilter = (p: P) => (
  <Svg {...p}>
    <path d="M3.5 6.5h17M6.5 12h11M10 17.5h4" />
  </Svg>
)

export const IconDownload = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5v11M8 10.5l4 4 4-4" />
    <path d="M4.5 17v2a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2" />
  </Svg>
)

export const IconUpload = (p: P) => (
  <Svg {...p}>
    <path d="M12 14.5v-11M8 7.5l4-4 4 4" />
    <path d="M4.5 17v2a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-2" />
  </Svg>
)

export const IconSpark = (p: P) => (
  <Svg {...p}>
    <path d="M12 3.5c.9 4.6 3.9 7.6 8.5 8.5-4.6.9-7.6 3.9-8.5 8.5-.9-4.6-3.9-7.6-8.5-8.5 4.6-.9 7.6-3.9 8.5-8.5Z" />
  </Svg>
)

export const IconFilm = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7.5 5v14M16.5 5v14M3 12h18" />
  </Svg>
)

export const IconSeries = (p: P) => (
  <Svg {...p}>
    <rect x="2.8" y="7" width="18.4" height="12.5" rx="2" />
    <path d="m8 3.5 3.4 3.5M16 3.5 12.6 7" />
  </Svg>
)

export const IconTrash = (p: P) => (
  <Svg {...p}>
    <path d="M4.5 6.8h15M9.5 6.8V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v1.8" />
    <path d="M6.6 6.8 7.4 20a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.8-13.2" />
  </Svg>
)

export const IconInstall = (p: P) => (
  <Svg {...p}>
    <rect x="6.5" y="2.8" width="11" height="18.4" rx="2.4" />
    <path d="M12 7.5v6M9.6 11.1 12 13.5l2.4-2.4" />
  </Svg>
)

export const IconDoom = (p: P) => (
  <Svg {...p}>
    <circle cx="9.5" cy="12" r="7.2" />
    <circle cx="14.5" cy="12" r="7.2" opacity="0.55" />
  </Svg>
)
