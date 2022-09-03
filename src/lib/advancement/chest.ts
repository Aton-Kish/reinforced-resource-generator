import { ProjectConfig, RecipeType } from '@/lib/common'

import { AdvancementGenerator } from './common'

import type { Advancement } from './common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestAdvancementGenerator extends AdvancementGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

    this.#project = project
    this.#material = material
  }

  generate(): Advancement {
    const advancement: Advancement = {
      parent: 'minecraft:recipes/root',
      rewards: {
        recipes: [
          `${this.#project.namespace}:${this.#material.name}_chest${
            this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
          }`,
        ],
      },
      criteria: {
        [`has_${this.#material.lower.chest.name}`]: {
          trigger: 'minecraft:inventory_changed',
          conditions: {
            items: [
              {
                items: [`${this.#material.lower.chest.namespace}:${this.#material.lower.chest.name}`],
              },
            ],
          },
        },
        [`has_${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}`]: {
          trigger: 'minecraft:inventory_changed',
          conditions: {
            items: [
              {
                items: [`${this.#material.namespace}:${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}`],
              },
            ],
          },
        },
        has_the_recipe: {
          trigger: 'minecraft:recipe_unlocked',
          conditions: {
            recipe: `${this.#project.namespace}:${this.#material.name}_chest${
              this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
            }`,
          },
        },
      },
      requirements: [
        [
          `has_${this.#material.lower.chest.name}`,
          `has_${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}`,
          'has_the_recipe',
        ],
      ],
    }

    return advancement
  }

  path(): string {
    return `data/${this.#project.namespace}/advancements/recipes/decorations/${this.#material.name}_chest${
      this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
    }.json`
  }
}
