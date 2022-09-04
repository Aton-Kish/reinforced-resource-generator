import JSZip from 'jszip'
import { merge } from 'lodash'

import { RecipeType, ShulkerType, ShulkerUpgradeFrom } from '@/lib/common'

import type { Recipe } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerRecipeGenerator implements Generator<Recipe> {
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
        return `data/${this.#project.namespace}/recipes/${this.#material.name}_shulker_box_from_${
          this.#material.name
        }_chest.json`
      case ShulkerUpgradeFrom.Shulker:
        if (type == null) {
          throw new Error('type argument is required')
        }

        return `data/${this.#project.namespace}/recipes/${type === ShulkerType.Default ? '' : `${type}_`}${
          this.#material.name
        }_shulker_box${this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''}.json`
    }
  }

  async zip(zip: JSZip, from: ShulkerUpgradeFrom, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, from: ShulkerUpgradeFrom, type: ShulkerType, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, from: ShulkerUpgradeFrom, arg1?: ShulkerType | ZipOptions, arg2?: ZipOptions): Promise<JSZip> {
    const isShulker = (arg?: ShulkerType | ZipOptions): arg is ShulkerType => typeof arg === 'string'

    let type: ShulkerType | undefined
    let options: ZipOptions | undefined
    if (isShulker(arg1)) {
      type = arg1
    } else {
      options = arg1
    }
    options = options ?? arg2

    let recipe: Recipe
    const path = this.path(from, type)
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      recipe = merge(JSON.parse(await zip.file(path)!.async('string')) as Recipe, this.generate(from, type))
    } else {
      recipe = this.generate(from, type)
    }

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
      result: {
        item: `${this.#project.namespace}:${type === ShulkerType.Default ? '' : `${type}_`}${
          this.#material.name
        }_shulker_box`,
      },
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
