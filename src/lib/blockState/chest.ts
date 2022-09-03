import { BlockStateGenerator } from './common'

import type { BlockState } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestBlockStateGenerator extends BlockStateGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

    this.#project = project
    this.#material = material
  }

  generate(): BlockState {
    const state: BlockState = {
      variants: {
        '': {
          model: `${this.#project.namespace}:block/${this.#material.name}_chest`,
        },
      },
    }

    return state
  }

  path(): string {
    return `assets/${this.#project.namespace}/blockstates/${this.#material.name}_chest.json`
  }
}
