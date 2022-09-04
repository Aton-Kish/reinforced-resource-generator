import JSZip from 'jszip'
import merge from 'ts-deepmerge'

import type { BlockState } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestBlockStateGenerator implements Generator<BlockState> {
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

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip> {
    let blockState: BlockState
    const path = this.path()
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      blockState = merge(JSON.parse(await zip.file(path)!.async('string')) as BlockState, this.generate())
    } else {
      blockState = this.generate()
    }

    const data = JSON.stringify(blockState, null, 2)
    zip.file(path, data)

    return zip
  }
}
