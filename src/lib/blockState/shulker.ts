import JSZip from 'jszip'
import { merge } from 'lodash'

import { ShulkerType } from '@/lib/common'

import type { BlockState } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerBlockStateGenerator implements Generator<BlockState> {
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

  path(type: ShulkerType): string {
    return `assets/${this.#project.namespace}/blockstates/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }

  async zip(zip: JSZip, type: ShulkerType, options?: ZipOptions): Promise<JSZip> {
    let blockState: BlockState
    const path = this.path(type)
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      blockState = merge(JSON.parse(await zip.file(path)!.async('string')) as BlockState, this.generate(type))
    } else {
      blockState = this.generate(type)
    }

    const data = JSON.stringify(blockState, null, 2)
    zip.file(path, data)

    return zip
  }
}
