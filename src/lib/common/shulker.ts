export const ShulkerType = {
  Default: 'default',
  White: 'white',
  Orange: 'orange',
  Magenta: 'magenta',
  LightBlue: 'light_blue',
  Yellow: 'yellow',
  Lime: 'lime',
  Pink: 'pink',
  Gray: 'gray',
  LightGray: 'light_gray',
  Cyan: 'cyan',
  Purple: 'purple',
  Blue: 'blue',
  Brown: 'brown',
  Green: 'green',
  Red: 'red',
  Black: 'black',
} as const

export type ShulkerType = typeof ShulkerType[keyof typeof ShulkerType]

export const ShulkerUpgradeFrom = {
  Chest: 'chest',
  Shulker: 'shulker',
} as const

export type ShulkerUpgradeFrom = typeof ShulkerUpgradeFrom[keyof typeof ShulkerUpgradeFrom]
