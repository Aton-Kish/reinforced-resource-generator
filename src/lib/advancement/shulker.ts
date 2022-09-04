import JSZip from 'jszip'
import merge from 'ts-deepmerge'

import { RecipeType, ShulkerType, ShulkerUpgradeFrom } from '@/lib/common'

import type { Advancement } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerAdvancementGenerator implements Generator<Advancement> {
  #project: ProjectConfig
  #chestProject: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, chestProject: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#chestProject = chestProject
    this.#material = material
  }

  generate(from: ShulkerUpgradeFrom): Advancement {
    switch (from) {
      case ShulkerUpgradeFrom.Chest:
        return this.#fromChest()
      case ShulkerUpgradeFrom.Shulker:
        return this.#fromShulker()
    }
  }

  path(from: ShulkerUpgradeFrom): string {
    switch (from) {
      case ShulkerUpgradeFrom.Chest:
        return `data/${this.#project.namespace}/advancements/recipes/decorations/${
          this.#material.name
        }_shulker_box_from_${this.#material.name}_chest.json`
      case ShulkerUpgradeFrom.Shulker:
        return `data/${this.#project.namespace}/advancements/recipes/decorations/${this.#material.name}_shulker_box${
          this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
        }.json`
    }
  }

  async zip(zip: JSZip, from: ShulkerUpgradeFrom, options?: ZipOptions): Promise<JSZip> {
    let advancement: Advancement
    const path = this.path(from)
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      advancement = merge(JSON.parse(await zip.file(path)!.async('string')) as Advancement, this.generate(from))
    } else {
      advancement = this.generate(from)
    }

    const data = JSON.stringify(advancement, null, 2)
    zip.file(path, data)

    return zip
  }

  #fromChest(): Advancement {
    const advancement: Advancement = {
      parent: 'minecraft:recipes/root',
      rewards: {
        recipes: [`${this.#project.namespace}:${this.#material.name}_shulker_box_from_${this.#material.name}_chest`],
      },
      criteria: {
        [`has_${this.#material.name}_chest`]: {
          trigger: 'minecraft:inventory_changed',
          conditions: {
            items: [
              {
                items: [`${this.#chestProject.namespace}:${this.#material.name}_chest`],
              },
            ],
          },
        },
        has_the_recipe: {
          trigger: 'minecraft:recipe_unlocked',
          conditions: {
            recipe: `${this.#project.namespace}:${this.#material.name}_shulker_box_from_${this.#material.name}_chest`,
          },
        },
      },
      requirements: [[`has_${this.#material.name}_chest`, 'has_the_recipe']],
    }

    return advancement
  }

  #fromShulker(): Advancement {
    const advancement: Advancement = {
      parent: 'minecraft:recipes/root',
      rewards: {
        recipes: Object.values(ShulkerType).map(
          (type) =>
            `${this.#project.namespace}:${type === ShulkerType.Default ? '' : `${type}_`}${
              this.#material.name
            }_shulker_box${this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''}`,
        ),
      },
      criteria: {
        [`has_${this.#material.lower.shulker.name}`]: {
          trigger: 'minecraft:inventory_changed',
          conditions: {
            items: [
              {
                items: Object.values(ShulkerType).map(
                  (type) =>
                    `${this.#material.lower.shulker.namespace}:${type === ShulkerType.Default ? '' : `${type}_`}${
                      this.#material.lower.shulker.name
                    }`,
                ),
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
            recipe: `${this.#project.namespace}:${this.#material.name}_shulker_box${
              this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
            }`,
          },
        },
      },
      requirements: [
        [
          `has_${this.#material.lower.shulker.name}`,
          `has_${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}`,
          'has_the_recipe',
        ],
      ],
    }

    return advancement
  }
}
