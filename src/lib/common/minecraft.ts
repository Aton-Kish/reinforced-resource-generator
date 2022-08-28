export interface MinecraftIndentifier {
  namespace: string
  name: string
}

export const RecipeType = {
  Crafting: 'crafting',
  Smithing: 'smithing',
} as const

export type RecipeType = typeof RecipeType[keyof typeof RecipeType]
