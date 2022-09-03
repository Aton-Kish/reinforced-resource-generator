import merge from 'ts-deepmerge'

import type { ShulkerType } from '@/lib/common'
import type JSZip from 'jszip'

export abstract class BlockStateGenerator {
  abstract generate(type?: ShulkerType): BlockState

  abstract path(type?: ShulkerType): string

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, type: ShulkerType, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, arg1?: ShulkerType | ZipOptions, arg2?: ZipOptions): Promise<JSZip> {
    const isShulkerType = (arg?: ShulkerType | ZipOptions): arg is ShulkerType => typeof arg === 'string'

    let type: ShulkerType | undefined
    let options: ZipOptions | undefined
    if (isShulkerType(arg1)) {
      type = arg1
    } else {
      options = arg1
    }
    options = options ?? arg2

    let advancement: BlockState
    const path = this.path(type)
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      advancement = merge(JSON.parse(await zip.file(path)!.async('string')) as BlockState, this.generate(type))
    } else {
      advancement = this.generate(type)
    }

    const data = JSON.stringify(advancement, null, 2)
    zip.file(path, data)

    return zip
  }
}

export interface ZipOptions {
  extend?: boolean
}

export interface BlockState {
  variants: {
    [key: string]: {
      model: string
      x?: number
      y?: number
    }
  }
}
