import { ItemModelGenerator } from './common'

import type { ItemModel } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class BarrelItemModelGenerator extends ItemModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

    this.#project = project
    this.#material = material
  }

  generate(): ItemModel {
    const model: ItemModel = {
      parent: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
    }

    return model
  }

  path(): string {
    return `assets/${this.#project.namespace}/models/item/${this.#material.name}_barrel.json`
  }
}
