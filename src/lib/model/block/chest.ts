import JSZip from 'jszip'
import merge from 'ts-deepmerge'

import type { BlockModel } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestBlockModelGenerator implements Generator<BlockModel> {
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

  path(): string {
    return `assets/${this.#project.namespace}/models/block/${this.#material.name}_chest.json`
  }

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip> {
    let blockModel: BlockModel
    const path = this.path()
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      blockModel = merge(JSON.parse(await zip.file(path)!.async('string')) as BlockModel, this.generate())
    } else {
      blockModel = this.generate()
    }

    const data = JSON.stringify(blockModel, null, 2)
    zip.file(path, data)

    return zip
  }
}
