import type { BlockState, BlockStateGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestBlockStateGenerator implements BlockStateGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): BlockState {
    const states: BlockState = {
      variants: {
        '': {
          model: `${this.#project.namespace}:block/${this.#material.name}_chest`,
        },
      },
    }

    return states
  }
}
