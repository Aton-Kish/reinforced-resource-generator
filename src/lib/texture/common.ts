import Jimp from 'jimp'

import type { BarrelType, ChestType, ShulkerType } from '@/lib/common'
import type JSZip from 'jszip'

export abstract class TextureGenerator {
  abstract generate(type: ChestType | ShulkerType | BarrelType): Jimp

  abstract path(type: ChestType | ShulkerType | BarrelType): string

  async zip(zip: JSZip, type: ChestType | ShulkerType | BarrelType): Promise<JSZip> {
    const path = this.path(type)
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const jimp = this.generate(type)
    const data = await jimp
      .getBase64Async(Jimp.MIME_PNG)
      .then((data) => data.substring('data:image/png;base64,'.length))

    zip.file(path, data, { base64: true })

    return zip
  }
}
