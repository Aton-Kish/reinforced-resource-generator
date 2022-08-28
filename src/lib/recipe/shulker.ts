import { ProjectConfig, RecipeType, ShulkerType, ShulkerUpgradeFrom } from '@/lib/common'

import { Recipe, RecipeGenerator } from './common'

import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class ShulkerRecipeGenerator implements RecipeGenerator {
  #project: ProjectConfig
  #chestProject: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, chestProject: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#chestProject = chestProject
    this.#material = material
  }

  generate(from: ShulkerUpgradeFrom, type?: ShulkerType): Recipe {
    switch (from) {
      case ShulkerUpgradeFrom.Chest:
        return this.#craftingFromChest()
      case ShulkerUpgradeFrom.Shulker:
        if (type == null) {
          throw new Error('type argument is required')
        }

        switch (this.#material.recipeType) {
          case RecipeType.Crafting:
            return this.#craftingFromShulker(type)
          case RecipeType.Smithing:
            return this.#smithing(type)
        }
    }
  }

  path(from: ShulkerUpgradeFrom, type?: ShulkerType): string {
    switch (from) {
      case ShulkerUpgradeFrom.Chest:
        return `data/recipes/${this.#material.name}_shulker_box_from_${this.#material.name}_chest.json`
      case ShulkerUpgradeFrom.Shulker:
        if (type == null) {
          throw new Error('type argument is required')
        }

        return `data/recipes/${this.#project.namespace}:${type === ShulkerType.Default ? '' : `${type}_`}${
          this.#material.name
        }_shulker_box${this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''}.json`
    }
  }

  zipSync(zip: JSZip, from: ShulkerUpgradeFrom, type?: ShulkerType): JSZip {
    const path = this.path(from, type)
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const recipe = this.generate(from, type)
    const data = JSON.stringify(recipe, null, 2)

    zip.file(path, data)

    return zip
  }

  #craftingFromChest(): Recipe {
    const recipe: Recipe = {
      type: 'minecraft:crafting_shaped',
      pattern: ['S', 'C', 'S'],
      key: {
        C: { item: `${this.#chestProject.namespace}:${this.#material.name}_chest` },
        S: { item: 'minecraft:shulker_shell' },
      },
      result: { item: `${this.#project.namespace}:${this.#material.name}_shulker_box` },
    }

    return recipe
  }

  #craftingFromShulker(type: ShulkerType): Recipe {
    const recipe: Recipe = {
      type: 'reinfshulker:crafting_special_reinforcedshulkerbox',
      pattern: ['MMM', 'MSM', 'MMM'],
      key: {
        S: {
          item: `${this.#material.lower.shulker.namespace}:${type === ShulkerType.Default ? '' : `${type}_`}${
            this.#material.lower.shulker.name
          }`,
        },
        M: { item: `${this.#material.namespace}:${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}` },
      },
      result: { item: `${this.#project.namespace}:${this.#material.name}_shulker_box` },
    }

    return recipe
  }

  #smithing(type: ShulkerType): Recipe {
    const recipe: Recipe = {
      type: 'minecraft:smithing',
      base: {
        item: `${this.#material.lower.shulker.namespace}:${type === ShulkerType.Default ? '' : `${type}_`}${
          this.#material.lower.shulker.name
        }`,
      },
      addition: {
        item: `${this.#material.namespace}:${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}`,
      },
      result: {
        item: `${this.#project.namespace}:${type === ShulkerType.Default ? '' : `${type}_`}${
          this.#material.name
        }_shulker_box`,
      },
    }

    return recipe
  }
}
