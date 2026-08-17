import type { ComponentType, SVGProps } from 'react'
import {
  IconDoom,
  IconGauge,
  IconGrid,
  IconHome,
  IconLink,
  IconPeople,
  IconRoute,
} from '../ui/Icon'

export interface NavItem {
  to: string
  label: string
  /** Rótulo curto para a barra inferior. */
  short: string
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
  /** Aparece na barra inferior do mobile. */
  primary: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Base', short: 'Base', icon: IconHome, primary: true },
  { to: '/rota', label: 'A rota', short: 'Rota', icon: IconRoute, primary: true },
  { to: '/catalogo', label: 'Produções', short: 'Obras', icon: IconGrid, primary: true },
  { to: '/elenco', label: 'Elenco', short: 'Elenco', icon: IconPeople, primary: true },
  { to: '/progresso', label: 'Progresso', short: 'Você', icon: IconGauge, primary: true },
  { to: '/conexoes', label: 'Conexões', short: 'Fios', icon: IconLink, primary: false },
  { to: '/destino', label: 'Doomsday', short: 'Destino', icon: IconDoom, primary: false },
]

export const PRIMARY_NAV = NAV_ITEMS.filter((i) => i.primary)
export const SECONDARY_NAV = NAV_ITEMS.filter((i) => !i.primary)
