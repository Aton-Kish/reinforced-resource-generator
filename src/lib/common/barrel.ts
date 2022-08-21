export const BarrelType = {
  Top: 'top',
  TopOpen: 'top_open',
  Side: 'side',
  Bottom: 'bottom',
} as const

export type BarrelType = typeof BarrelType[keyof typeof BarrelType]
