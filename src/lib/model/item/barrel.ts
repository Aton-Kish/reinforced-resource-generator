import JSZip from 'jszip'

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
    const model: ItemModel = {
      parent: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
    }

    return model
  }

  zip(z: JSZip): JSZip {
    const model = this.generate()
    const data = JSON.stringify(model, null, 2)

    const path = `assets/${this.#project.namespace}/models/item/${this.#material.name}_barrel.json`
    z.file(path, data)

    return z
  }
}
