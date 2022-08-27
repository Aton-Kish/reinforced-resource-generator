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

  zip(z: JSZip): JSZip {
    const model = this.generate()
    const data = JSON.stringify(model, null, 2)

    const path = `assets/${this.#project.namespace}/models/block/${this.#material.name}_chest.json`
    z.file(path, data)

    return z
  }
}
