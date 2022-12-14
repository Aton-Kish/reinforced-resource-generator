import Jimp from 'jimp'
import JSZip from 'jszip'

import {
  ShulkerBlackTexture,
  ShulkerBlueTexture,
  ShulkerBrownTexture,
  ShulkerCyanTexture,
  ShulkerDefaultTexture,
  ShulkerGrayTexture,
  ShulkerGreenTexture,
  ShulkerLightBlueTexture,
  ShulkerLightGrayTexture,
  ShulkerLimeTexture,
  ShulkerMagentaTexture,
  ShulkerOrangeTexture,
  ShulkerPinkTexture,
  ShulkerPurpleTexture,
  ShulkerRedTexture,
  ShulkerWhiteTexture,
  ShulkerYellowTexture,
} from '@/assets/shulker'
import { ShulkerType } from '@/lib/common'

import { Material9 } from './material'

import type { MaterialTexture } from './material'
import type { Generator, ProjectConfig } from '@/lib/common'

export interface ShulkerTexture {
  type: ShulkerType
  src: string
}

export class ShulkerTextureGenerator implements Generator<Jimp> {
  #project: ProjectConfig
  #material: MaterialTexture

  #base?: Record<ShulkerType, Jimp>
  #material9?: Material9

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  static async build(project: ProjectConfig, material: MaterialTexture): Promise<ShulkerTextureGenerator> {
    const generator = new ShulkerTextureGenerator(project, material)
    generator.#base = {
      [ShulkerType.Default]: await Jimp.read(ShulkerDefaultTexture.src),
      [ShulkerType.White]: await Jimp.read(ShulkerWhiteTexture.src),
      [ShulkerType.Orange]: await Jimp.read(ShulkerOrangeTexture.src),
      [ShulkerType.Magenta]: await Jimp.read(ShulkerMagentaTexture.src),
      [ShulkerType.LightBlue]: await Jimp.read(ShulkerLightBlueTexture.src),
      [ShulkerType.Yellow]: await Jimp.read(ShulkerYellowTexture.src),
      [ShulkerType.Lime]: await Jimp.read(ShulkerLimeTexture.src),
      [ShulkerType.Pink]: await Jimp.read(ShulkerPinkTexture.src),
      [ShulkerType.Gray]: await Jimp.read(ShulkerGrayTexture.src),
      [ShulkerType.LightGray]: await Jimp.read(ShulkerLightGrayTexture.src),
      [ShulkerType.Cyan]: await Jimp.read(ShulkerCyanTexture.src),
      [ShulkerType.Purple]: await Jimp.read(ShulkerPurpleTexture.src),
      [ShulkerType.Blue]: await Jimp.read(ShulkerBlueTexture.src),
      [ShulkerType.Brown]: await Jimp.read(ShulkerBrownTexture.src),
      [ShulkerType.Green]: await Jimp.read(ShulkerGreenTexture.src),
      [ShulkerType.Red]: await Jimp.read(ShulkerRedTexture.src),
      [ShulkerType.Black]: await Jimp.read(ShulkerBlackTexture.src),
    }
    generator.#material9 = new Material9(await Jimp.read(material.src))

    return generator
  }

  #validate() {
    if (this.#base == null || this.#material9 == null) {
      throw new Error('initialization not completed')
    }

    for (const [type, image] of Object.entries(this.#base)) {
      if (!(image.getWidth() === 64 && image.getHeight() === 64)) {
        throw new Error(`${type} color image size must be 64x64`)
      }
    }
  }

  generate(type: ShulkerType): Jimp {
    this.#validate()

    const material = this.#material9!.rect(16, 16)

    const leftPillar = material.clone().crop(0, 0, 2, 16)
    const rightPillar = material.clone().crop(14, 0, 2, 16)
    const topLeftPillar = leftPillar.clone().resize(2, 13).crop(0, 0, 2, 12)
    const topRightPillar = rightPillar.clone().resize(2, 13).crop(0, 0, 2, 12)
    const bottomLeftPillar = leftPillar.clone().resize(2, 4)
    const bottomRightPillar = rightPillar.clone().resize(2, 4)

    const leftSide = this.#material9!.leftSide(5)
    const rightSide = this.#material9!.rightSide(5)
    const topSide = this.#material9!.topSide(8)
    const bottomSide = this.#material9!.bottomSide(10)
    const bottomLeftSide = bottomSide.clone().crop(0, 0, 5, 1)
    const bottomRightSide = bottomSide.clone().crop(5, 0, 5, 1)

    const topInner = material.clone().mask(this.#topInnerMask(), 0, 0)
    const topOuter = material.clone().mask(this.#topOuterMask(), 0, 0)
    const bottomInner = material.clone().mask(this.#bottomInnerMask(), 0, 0)
    const bottomOuter = material.clone().mask(this.#bottomOuterMask(), 0, 0)

    const plate = this.#material9!.rect(12, 12)

    const image = this.#base![type].clone()

    for (let i = 0; i < 4; i++) {
      image.composite(topLeftPillar, 16 * i, 16)
      image.composite(topRightPillar, 16 * i + 14, 16)

      image.composite(bottomLeftPillar, 16 * i, 48)
      image.composite(bottomRightPillar, 16 * i + 14, 48)

      image.composite(leftSide, 16 * i + 4, 44)
      image.composite(rightSide, 16 * i + 11, 44)
      image.composite(topSide, 16 * i + 4, 44)
      image.composite(bottomLeftSide, 16 * i, 48)
      image.composite(bottomRightSide, 16 * i + 11, 48)
    }

    image.composite(topOuter, 16, 0)
    image.composite(plate, 18, 2)
    image.composite(topInner, 32, 0)

    image.composite(bottomInner, 16, 28)
    image.composite(bottomOuter, 32, 28)

    return image
  }

  path(type: ShulkerType): string {
    return `assets/${this.#project.namespace}/textures/entity/reinforced_shulker/${this.#material.name}/shulker${
      type === ShulkerType.Default ? '' : `_${type}`
    }.png`
  }

  async zip(zip: JSZip, type: ShulkerType): Promise<JSZip> {
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

  #topInnerMask(): Jimp {
    const mask = new Jimp(16, 16, 'black')

    mask.composite(new Jimp(4, 1, 'white'), 0, 0)
    mask.composite(new Jimp(4, 1, 'white'), 12, 0)
    mask.composite(new Jimp(1, 4, 'white'), 15, 0)
    mask.composite(new Jimp(1, 4, 'white'), 15, 12)
    mask.composite(new Jimp(4, 1, 'white'), 12, 15)
    mask.composite(new Jimp(4, 1, 'white'), 0, 15)
    mask.composite(new Jimp(1, 4, 'white'), 0, 12)
    mask.composite(new Jimp(1, 4, 'white'), 0, 0)

    return mask
  }

  #topOuterMask(): Jimp {
    const mask = new Jimp(16, 16, 'black')

    mask.composite(new Jimp(2, 2, 'white'), 0, 0)
    mask.composite(new Jimp(2, 2, 'white'), 14, 0)
    mask.composite(new Jimp(2, 2, 'white'), 14, 14)
    mask.composite(new Jimp(2, 2, 'white'), 0, 14)

    return mask
  }

  #bottomInnerMask(): Jimp {
    const mask = new Jimp(16, 16, 'black')

    mask.composite(new Jimp(8, 1, 'white'), 4, 0)
    mask.composite(new Jimp(1, 8, 'white'), 15, 4)
    mask.composite(new Jimp(8, 1, 'white'), 4, 15)
    mask.composite(new Jimp(1, 8, 'white'), 0, 4)

    return mask
  }

  #bottomOuterMask(): Jimp {
    const mask = new Jimp(16, 16, 'black')

    mask.composite(new Jimp(2, 2, 'white'), 0, 0)
    mask.composite(new Jimp(2, 2, 'white'), 14, 0)
    mask.composite(new Jimp(2, 2, 'white'), 14, 14)
    mask.composite(new Jimp(2, 2, 'white'), 0, 14)

    mask.composite(new Jimp(1, 12, 'white'), 2, 2)
    mask.composite(new Jimp(12, 1, 'white'), 2, 13)
    mask.composite(new Jimp(1, 12, 'white'), 13, 2)
    mask.composite(new Jimp(10, 1, 'white'), 4, 2)
    mask.composite(new Jimp(1, 10, 'white'), 4, 2)
    mask.composite(new Jimp(8, 1, 'white'), 4, 11)
    mask.composite(new Jimp(1, 8, 'white'), 11, 4)
    mask.composite(new Jimp(6, 1, 'white'), 6, 4)
    mask.composite(new Jimp(1, 6, 'white'), 6, 4)
    mask.composite(new Jimp(4, 1, 'white'), 6, 9)
    mask.composite(new Jimp(1, 4, 'white'), 9, 6)
    mask.composite(new Jimp(2, 1, 'white'), 8, 6)

    return mask
  }
}
