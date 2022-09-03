import merge from 'ts-deepmerge'

import type { BarrelType, ShulkerType } from '@/lib/common'
import type JSZip from 'jszip'

export abstract class BlockModelGenerator {
  abstract generate(type?: ShulkerType | BarrelType): BlockModel

  abstract path(type?: ShulkerType | BarrelType): string

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, type: ShulkerType | BarrelType, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, arg1?: ShulkerType | BarrelType | ZipOptions, arg2?: ZipOptions): Promise<JSZip> {
    const isShulkerOrBarrelType = (arg?: ShulkerType | BarrelType | ZipOptions): arg is ShulkerType | BarrelType =>
      typeof arg === 'string'

    let type: ShulkerType | BarrelType | undefined
    let options: ZipOptions | undefined
    if (isShulkerOrBarrelType(arg1)) {
      type = arg1
    } else {
      options = arg1
    }
    options = options ?? arg2

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

export interface ZipOptions {
  extend?: boolean
}

export interface BlockModel {
  parent?: string
  textures?: Record<string, string>
}
