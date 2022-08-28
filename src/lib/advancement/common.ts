import { ShulkerUpgradeFrom } from '../common'

import type JSZip from 'jszip'

export interface AdvancementGenerator {
  generate(from?: ShulkerUpgradeFrom): Advancement
  path(from?: ShulkerUpgradeFrom): string
  zipSync(zip: JSZip, from?: ShulkerUpgradeFrom): JSZip
}

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
