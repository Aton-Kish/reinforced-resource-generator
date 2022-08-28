import type { BlockState, BlockStateGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class ChestBlockStateGenerator implements BlockStateGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
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

  zipSync(zip: JSZip): JSZip {
    const path = this.path()
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const state = this.generate()
    const data = JSON.stringify(state, null, 2)

    zip.file(path, data)

    return zip
  }
}
