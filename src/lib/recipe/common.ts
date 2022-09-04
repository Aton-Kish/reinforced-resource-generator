export type Recipe = CraftingRecipe | SmithingRecipe

export interface BaseRecipe {
  type: string
  result: RecipeOutput
}

export interface CraftingRecipe extends BaseRecipe {
  pattern: string[]
  key: Record<string, RecipeIngredient>
}

export interface SmithingRecipe extends BaseRecipe {
  base: RecipeIngredient
  addition: RecipeIngredient
}

export interface RecipeIngredient {
  item: string
}

export interface RecipeOutput {
  item: string
}
