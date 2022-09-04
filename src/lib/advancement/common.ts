export interface Advancement {
  parent: string
  rewards: {
    recipes: string[]
  }
  criteria: Record<string, AdvancementCriteria>
  requirements: string[][]
}

export interface AdvancementCriteria {
  trigger: string
  conditions: AdvancementCriteriaItemsConditions | AdvancementCriteriaRecipeConditions
}

export interface AdvancementCriteriaItemsConditions {
  items: { items: string[] }[]
}

export interface AdvancementCriteriaRecipeConditions {
  recipe: string
}
