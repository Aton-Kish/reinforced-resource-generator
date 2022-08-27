import type { ItemModel, ItemModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class BarrelItemModelGenerator implements ItemModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): ItemModel {
    const states: ItemModel = {
      parent: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
    }

    return states
  }
}
