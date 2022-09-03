import { ProjectConfig, RecipeType } from '@/lib/common'

import { RecipeGenerator } from './common'

import type { Recipe } from './common'
import type { MaterialTexture } from '@/lib/texture'

export class BarrelRecipeGenerator extends RecipeGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

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
    return `data/${this.#project.namespace}/recipes/${this.#material.name}_barrel${
      this.#material.recipeType === RecipeType.Smithing ? '_smithing' : ''
    }.json`
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
