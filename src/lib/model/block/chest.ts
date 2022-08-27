import JSZip from 'jszip'

import type { BlockModel, BlockModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

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
    const model = this.generate()
    const data = JSON.stringify(model, null, 2)

    const path = this.path()
    zip.file(path, data)

    return zip
  }
}
