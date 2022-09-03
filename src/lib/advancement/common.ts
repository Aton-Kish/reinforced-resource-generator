import merge from 'ts-deepmerge'

import { ShulkerUpgradeFrom } from '../common'

import type JSZip from 'jszip'

export abstract class AdvancementGenerator {
  abstract generate(from?: ShulkerUpgradeFrom): Advancement

  abstract path(from?: ShulkerUpgradeFrom): string

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, from: ShulkerUpgradeFrom, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, arg1?: ShulkerUpgradeFrom | ZipOptions, arg2?: ZipOptions): Promise<JSZip> {
    const isShulkerUpgradeFrom = (arg?: ShulkerUpgradeFrom | ZipOptions): arg is ShulkerUpgradeFrom =>
      typeof arg === 'string'

    let from: ShulkerUpgradeFrom | undefined
    let options: ZipOptions | undefined
    if (isShulkerUpgradeFrom(arg1)) {
      from = arg1
    } else {
      options = arg1
    }
    options = options ?? arg2

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
}

export interface ZipOptions {
  extend?: boolean
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
