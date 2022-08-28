import { ProjectConfig, RecipeType } from '@/lib/common'

import type { Recipe, RecipeGenerator } from './common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class BarrelRecipeGenerator implements RecipeGenerator {
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
    return `data/recipes/${this.#material.name}_barrel${
      this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
    }.json`
  }

  zipSync(zip: JSZip): JSZip {
    const path = this.path()
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const recipe = this.generate()
    const data = JSON.stringify(recipe, null, 2)

    zip.file(path, data)

    return zip
  }

  #crafting(): Recipe {
    const recipe: Recipe = {
      type: 'minecraft:crafting_shaped',
      pattern: ['MMM', 'MBM', 'MMM'],
      key: {
        B: { item: `${this.#material.lower.barrel.namespace}:${this.#material.lower.barrel.name}` },
        M: { item: `${this.#material.namespace}:${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}` },
      },
      result: { item: `${this.#project.namespace}:${this.#material.name}_barrel` },
    }

    return recipe
  }

  #smithing(): Recipe {
    const recipe: Recipe = {
      type: 'minecraft:smithing',
      base: { item: `${this.#material.lower.barrel.namespace}:${this.#material.lower.barrel.name}` },
      addition: {
        item: `${this.#material.namespace}:${this.#material.name}${this.#material.hasIngot ? '_ingot' : ''}`,
      },
      result: { item: `${this.#project.namespace}:${this.#material.name}_barrel` },
    }

    return recipe
  }
}
