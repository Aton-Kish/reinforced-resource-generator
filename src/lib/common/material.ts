import type { MinecraftIndentifier, RecipeType } from './minecraft'

export interface Material extends MinecraftIndentifier {
  hasIngot: boolean
  lower: MaterialLower
  recipeType: RecipeType
}

export interface MaterialLower {
  chest: MinecraftIndentifier
  shulker: MinecraftIndentifier
  barrel: MinecraftIndentifier
}
