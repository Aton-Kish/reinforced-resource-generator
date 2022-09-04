import JSZip from 'jszip'
import { merge } from 'lodash'

import { ShulkerType } from '@/lib/common'

import type { BlockModel } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerBlockModelGenerator implements Generator<BlockModel> {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(type: ShulkerType): BlockModel {
    const model: BlockModel = {
      textures: {
        particle: `minecraft:block/${type === ShulkerType.Default ? '' : `${type}_`}shulker_box`,
      },
    }

    return model
  }

  path(type: ShulkerType): string {
    return `assets/${this.#project.namespace}/models/block/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }

  async zip(zip: JSZip, type: ShulkerType, options?: ZipOptions): Promise<JSZip> {
    let blockModel: BlockModel
    const path = this.path(type)
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      blockModel = merge(JSON.parse(await zip.file(path)!.async('string')) as BlockModel, this.generate(type))
    } else {
      blockModel = this.generate(type)
    }

    const data = JSON.stringify(blockModel, null, 2)
    zip.file(path, data)

    return zip
  }
}
