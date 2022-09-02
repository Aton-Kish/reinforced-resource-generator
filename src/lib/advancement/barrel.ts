import { ProjectConfig, RecipeType } from '@/lib/common'

import type { Advancement, AdvancementGenerator } from './common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class BarrelAdvancementGenerator implements AdvancementGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): Advancement {
    const advancement: Advancement = {
      parent: 'minecraft:recipes/root',
      rewards: {
        recipes: [
          `${this.#project.namespace}:${this.#material.name}_barrel${
            this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
          }`,
        ],
      },
      criteria: {
        [`has_${this.#material.lower.barrel.name}`]: {
          trigger: 'minecraft:inventory_changed',
          conditions: {
            items: [
              {
                items: [`${this.#material.lower.barrel.namespace}:${this.#material.lower.barrel.name}`],
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
            recipe: `${this.#project.namespace}:${this.#material.name}_barrel${
              this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
            }`,
          },
        },
      },
      requirements: [
        [
          `has_${this.#material.lower.barrel.name}`,
          `has_${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}`,
          'has_the_recipe',
        ],
      ],
    }

    return advancement
  }

  path(): string {
    return `data/${this.#project.namespace}/advancements/recipes/decorations/${this.#material.name}_barrel${
      this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
    }.json`
  }

  zipSync(zip: JSZip): JSZip {
    const path = this.path()
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const advancement = this.generate()
    const data = JSON.stringify(advancement, null, 2)

    zip.file(path, data)

    return zip
  }
}
