import JSZip from 'jszip'
import merge from 'ts-deepmerge'

import { RecipeType } from '@/lib/common'

import type { Advancement } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class BarrelAdvancementGenerator implements Generator<Advancement> {
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

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip> {
    let advancement: Advancement
    const path = this.path()
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      advancement = merge(JSON.parse(await zip.file(path)!.async('string')) as Advancement, this.generate())
    } else {
      advancement = this.generate()
    }

    const data = JSON.stringify(advancement, null, 2)
    zip.file(path, data)

    return zip
  }
}
