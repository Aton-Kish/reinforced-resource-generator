import type { ItemModel, ItemModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

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

  path(): string {
    return `assets/${this.#project.namespace}/models/item/${this.#material.name}_barrel.json`
  }

  zipSync(zip: JSZip): JSZip {
    const path = this.path()
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const model = this.generate()
    const data = JSON.stringify(model, null, 2)

    zip.file(path, data)

    return zip
  }
}
