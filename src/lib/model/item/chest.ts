import JSZip from 'jszip'
import { merge } from 'lodash'

import type { ItemModel } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestItemModelGenerator implements Generator<ItemModel> {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): ItemModel {
    const model: ItemModel = {
      parent: 'minecraft:builtin/entity',
      textures: {
        particle: `${this.#material.namespace}:block/${this.#material.name}_block`,
      },
      display: {
        gui: {
          rotation: [30, 45, 0],
          translation: [0, 0, 0],
          scale: [0.625, 0.625, 0.625],
        },
        ground: {
          rotation: [0, 0, 0],
          translation: [0, 3, 0],
          scale: [0.25, 0.25, 0.25],
        },
        head: {
          rotation: [0, 180, 0],
          translation: [0, 0, 0],
          scale: [1, 1, 1],
        },
        fixed: {
          rotation: [0, 180, 0],
          translation: [0, 0, 0],
          scale: [0.5, 0.5, 0.5],
        },
        thirdperson_righthand: {
          rotation: [75, 315, 0],
          translation: [0, 2.5, 0],
          scale: [0.375, 0.375, 0.375],
        },
        firstperson_righthand: {
          rotation: [0, 315, 0],
          translation: [0, 0, 0],
          scale: [0.4, 0.4, 0.4],
        },
      },
    }

    return model
  }

  path(): string {
    return `assets/${this.#project.namespace}/models/item/${this.#material.name}_chest.json`
  }

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip> {
    let itemModel: ItemModel
    const path = this.path()
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      itemModel = merge(JSON.parse(await zip.file(path)!.async('string')) as ItemModel, this.generate())
    } else {
      itemModel = this.generate()
    }

    const data = JSON.stringify(itemModel, null, 2)
    zip.file(path, data)

    return zip
  }
}
