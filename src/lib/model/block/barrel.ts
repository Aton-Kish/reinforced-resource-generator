import JSZip from 'jszip'
import { merge } from 'lodash'

import { BlockModelBarrelType } from './common'

import type { BlockModel } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class BarrelBlockModelGenerator implements Generator<BlockModel> {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(type: BlockModelBarrelType): BlockModel {
    switch (type) {
      case BlockModelBarrelType.Top:
        return this.#top()
      case BlockModelBarrelType.TopOpen:
        return this.#topOpen()
    }
  }

  path(type: BlockModelBarrelType): string {
    switch (type) {
      case BlockModelBarrelType.Top:
        return `assets/${this.#project.namespace}/models/block/${this.#material.name}_barrel.json`
      case BlockModelBarrelType.TopOpen:
        return `assets/${this.#project.namespace}/models/block/${this.#material.name}_barrel_open.json`
    }
  }

  async zip(zip: JSZip, type: BlockModelBarrelType, options?: ZipOptions): Promise<JSZip> {
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

  #top(): BlockModel {
    const model: BlockModel = {
      parent: 'minecraft:block/cube_bottom_top',
      textures: {
        top: `${this.#project.namespace}:block/${this.#material.name}_barrel_top`,
        bottom: `${this.#project.namespace}:block/${this.#material.name}_barrel_bottom`,
        side: `${this.#project.namespace}:block/${this.#material.name}_barrel_side`,
      },
    }

    return model
  }

  #topOpen(): BlockModel {
    const model: BlockModel = {
      parent: 'minecraft:block/cube_bottom_top',
      textures: {
        top: `${this.#project.namespace}:block/${this.#material.name}_barrel_top_open`,
        bottom: `${this.#project.namespace}:block/${this.#material.name}_barrel_bottom`,
        side: `${this.#project.namespace}:block/${this.#material.name}_barrel_side`,
      },
    }

    return model
  }
}
