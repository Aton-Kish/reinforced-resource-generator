import JSZip from 'jszip'

import { ShulkerType } from '@/lib/common'

import type { BlockState, BlockStateGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerBlockStateGenerator implements BlockStateGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
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

  zipSync(zip: JSZip, type: ShulkerType): JSZip {
    const state = this.generate(type)
    const data = JSON.stringify(state, null, 2)

    const path = `assets/${this.#project.namespace}/blockstates/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
    zip.file(path, data)

    return zip
  }
}
