import { BlockModelGenerator } from './common'

import type { BlockModel } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestBlockModelGenerator extends BlockModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

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
}
