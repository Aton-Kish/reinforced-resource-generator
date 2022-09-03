import merge from 'ts-deepmerge'

import { ShulkerType, ShulkerUpgradeFrom } from '../common'

import type JSZip from 'jszip'

export abstract class RecipeGenerator {
  abstract generate(from?: ShulkerUpgradeFrom, type?: ShulkerType): Recipe

  abstract path(from?: ShulkerUpgradeFrom, type?: ShulkerType): string

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, from: ShulkerUpgradeFrom, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, from: ShulkerUpgradeFrom, type: ShulkerType, options?: ZipOptions): Promise<JSZip>
  async zip(
    zip: JSZip,
    arg1?: ShulkerUpgradeFrom | ZipOptions,
    arg2?: ShulkerType | ZipOptions,
    arg3?: ZipOptions,
  ): Promise<JSZip> {
    const isShulkerUpgradeFrom = (arg?: ShulkerUpgradeFrom | ZipOptions): arg is ShulkerUpgradeFrom =>
      typeof arg === 'string'
    const isShulker = (arg?: ShulkerType | ZipOptions): arg is ShulkerType => typeof arg === 'string'

    let from: ShulkerUpgradeFrom | undefined
    let type: ShulkerType | undefined
    let options: ZipOptions | undefined
    if (isShulkerUpgradeFrom(arg1)) {
      from = arg1
    } else {
      options = arg1
    }
    if (isShulker(arg2)) {
      type = arg2
    } else {
      options = options ?? arg2
    }
    options = options ?? arg3

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
}

export interface ZipOptions {
  extend?: boolean
}

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
