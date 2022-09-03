import { ShulkerType } from '@/lib/common'

import { BlockStateGenerator } from './common'

import type { BlockState } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerBlockStateGenerator extends BlockStateGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

    this.#project = project
    this.#material = material
  }

  generate(type: ShulkerType): BlockState {
    const state: BlockState = {
      variants: {
        '': {
          model: `${this.#project.namespace}:block/${type === ShulkerType.Default ? '' : `${type}_`}${
            this.#material.name
          }_shulker_box`,
        },
      },
    }

    return state
  }

  path(type: ShulkerType): string {
    return `assets/${this.#project.namespace}/blockstates/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }
}
