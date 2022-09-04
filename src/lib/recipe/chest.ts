import JSZip from 'jszip'
import { merge } from 'lodash'

import { RecipeType } from '@/lib/common'

import type { Recipe } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestRecipeGenerator implements Generator<Recipe> {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): Recipe {
    switch (this.#material.recipeType) {
      case RecipeType.Crafting:
        return this.#crafting()
      case RecipeType.Smithing:
        return this.#smithing()
    }
  }

  path(): string {
    return `data/${this.#project.namespace}/recipes/${this.#material.name}_chest${
      this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
    }.json`
  }

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip> {
    let recipe: Recipe
    const path = this.path()
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      recipe = merge(JSON.parse(await zip.file(path)!.async('string')) as Recipe, this.generate())
    } else {
      recipe = this.generate()
    }

    const data = JSON.stringify(recipe, null, 2)
    zip.file(path, data)

    return zip
  }

  #crafting(): Recipe {
    const recipe: Recipe = {
      type: 'minecraft:crafting_shaped',
      pattern: ['MMM', 'MCM', 'MMM'],
      key: {
        C: { item: `${this.#material.lower.chest.namespace}:${this.#material.lower.chest.name}` },
        M: { item: `${this.#material.namespace}:${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}` },
      },
      result: { item: `${this.#project.namespace}:${this.#material.name}_chest` },
    }

    return recipe
  }

  #smithing(): Recipe {
    const recipe: Recipe = {
      type: 'minecraft:smithing',
      base: { item: `${this.#material.lower.chest.namespace}:${this.#material.lower.chest.name}` },
      addition: {
        item: `${this.#material.namespace}:${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}`,
      },
      result: { item: `${this.#project.namespace}:${this.#material.name}_chest` },
    }

    return recipe
  }
}
