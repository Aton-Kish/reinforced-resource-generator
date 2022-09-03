import merge from 'ts-deepmerge'

import type { ShulkerType } from '@/lib/common'
import type JSZip from 'jszip'

export abstract class ItemModelGenerator {
  abstract generate(type?: ShulkerType): ItemModel

  abstract path(type?: ShulkerType): string

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, type: ShulkerType, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, arg1?: ShulkerType | ZipOptions, arg2?: ZipOptions): Promise<JSZip> {
    const isShulker = (arg?: ShulkerType | ZipOptions): arg is ShulkerType => typeof arg === 'string'

    let type: ShulkerType | undefined
    let options: ZipOptions | undefined
    if (isShulker(arg1)) {
      type = arg1
    } else {
      options = arg1
    }
    options = options ?? arg2

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

export interface ZipOptions {
  extend?: boolean
}

export interface ItemModel {
  parent?: string
  textures?: Record<string, string>
  display?: Record<string, Record<string, number[]>>
}
