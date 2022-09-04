import JSZip from 'jszip'
import merge from 'ts-deepmerge'

import type { ItemModel } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class BarrelItemModelGenerator implements Generator<ItemModel> {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): ItemModel {
    const model: ItemModel = {
      parent: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
    }

    return model
  }

  path(): string {
    return `assets/${this.#project.namespace}/models/item/${this.#material.name}_barrel.json`
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
