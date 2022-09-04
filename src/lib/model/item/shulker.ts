import JSZip from 'jszip'
import { merge } from 'lodash'

import { ShulkerType } from '@/lib/common'

import type { ItemModel } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerItemModelGenerator implements Generator<ItemModel> {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(type: ShulkerType): ItemModel {
    const model: ItemModel = {
      parent: 'minecraft:item/template_shulker_box',
      textures: {
        particle: `minecraft:block/${type === ShulkerType.Default ? '' : `${type}_`}shulker_box`,
      },
    }

    return model
  }

  path(type: ShulkerType): string {
    return `assets/${this.#project.namespace}/models/item/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }

  async zip(zip: JSZip, type: ShulkerType, options?: ZipOptions): Promise<JSZip> {
    let itemModel: ItemModel
    const path = this.path(type)
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      itemModel = merge(JSON.parse(await zip.file(path)!.async('string')) as ItemModel, this.generate(type))
    } else {
      itemModel = this.generate(type)
    }

    const data = JSON.stringify(itemModel, null, 2)
    zip.file(path, data)

    return zip
  }
}
