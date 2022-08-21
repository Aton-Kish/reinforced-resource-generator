export const ChestType = {
  Single: 'single',
  Left: 'left',
  Right: 'right',
} as const

export type ChestType = typeof ChestType[keyof typeof ChestType]
