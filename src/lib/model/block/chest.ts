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
    const states: BlockModel = {
      textures: {
        particle: `${this.#material.namespace}:block/${this.#material.name}_block`,
      },
    }

    return states
  }
}
