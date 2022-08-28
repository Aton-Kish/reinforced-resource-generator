import type { BlockModel, BlockModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class ChestBlockModelGenerator implements BlockModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): BlockModel {
    const model: BlockModel = {
      textures: {
        particle: `${this.#material.namespace}:block/${this.#material.name}_block`,
      },
    }

    return model
  }

  path(): string {
    return `assets/${this.#project.namespace}/models/block/${this.#material.name}_chest.json`
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
