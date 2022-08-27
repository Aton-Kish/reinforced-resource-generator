import Jimp from 'jimp'

import { BarrelType } from '@/lib/common'

import { Material9 } from './material'

import type { TextureGenerator } from './common'

const ShadowColor = {
  OuterMain: Jimp.rgbaToInt(0, 0, 0, 65),
  OuterSub: Jimp.rgbaToInt(0, 0, 0, 90),
  InnerMain: Jimp.rgbaToInt(0, 0, 0, 175),
  InnerSub1: Jimp.rgbaToInt(0, 0, 0, 150),
  InnerSub2: Jimp.rgbaToInt(0, 0, 0, 125),
  InnerSub3: Jimp.rgbaToInt(0, 0, 0, 90),
} as const

export interface BarrelTexture {
  type: BarrelType
  src: string
}

export class BarrelTextureGenerator implements TextureGenerator {
  #base: Record<BarrelType, Jimp>
  #material9: Material9

  constructor(base: Record<BarrelType, Jimp>, material: Jimp) {
    for (const [type, image] of Object.entries(base)) {
      if (!(image.getWidth() === 16 && image.getHeight() === 16)) {
        throw new Error(`${type} image size must be 16x16`)
      }
    }

    this.#base = base
    this.#material9 = new Material9(material)
  }

  generate(type: BarrelType): Jimp {
    switch (type) {
      case BarrelType.Top:
        return this.#top()
      case BarrelType.TopOpen:
        return this.#topOpen()
      case BarrelType.Side:
        return this.#side()
      case BarrelType.Bottom:
        return this.#bottom()
    }
  }

  #top(): Jimp {
    const knob = this.#base.top.clone().crop(3, 8, 2, 2)
    const outerShadow = this.#outerShadow()

    const image = this.#material9.rect(16, 16)

    image.composite(knob, 3, 8)

    image.composite(outerShadow, 0, 0)

    return image
  }

  #topOpen(): Jimp {
    const outerShadow = this.#outerShadow()
    const innerShadow = this.#innerShadow()

    const image = this.#material9.rect(16, 16)

    image.composite(outerShadow, 0, 0)
    image.composite(innerShadow, 0, 0)

    return image
  }

  #side(): Jimp {
    const plate = this.#material9.rect(5, 18).crop(1, 1, 4, 16)
    const leftPlate = plate.clone().crop(0, 0, 2, 16)
    const rightPlate = plate.clone().crop(2, 0, 2, 16)

    const topHoop = this.#base.side.clone().crop(0, 3, 16, 2)
    const bottomHoop = this.#base.side.clone().crop(0, 11, 16, 2)

    const image = this.#material9.rect(16, 16)

    image.composite(rightPlate, 0, 0)
    image.composite(plate, 2, 0)
    image.composite(plate, 6, 0)
    image.composite(plate, 10, 0)
    image.composite(leftPlate, 14, 0)

    image.composite(topHoop, 0, 3)
    image.composite(bottomHoop, 0, 11)

    return image
  }

  #bottom(): Jimp {
    const image = this.#material9.rect(16, 16)

    return image
  }

  #outerShadow(): Jimp {
    const shadow = new Jimp(16, 16)

    shadow.setPixelColor(ShadowColor.OuterSub, 1, 1)

    shadow.setPixelColor(ShadowColor.OuterMain, 2, 1)
    shadow.setPixelColor(ShadowColor.OuterMain, 1, 2)

    shadow.setPixelColor(ShadowColor.OuterMain, 1, 3)
    shadow.setPixelColor(ShadowColor.OuterMain, 2, 2)
    shadow.setPixelColor(ShadowColor.OuterMain, 3, 1)

    shadow.setPixelColor(ShadowColor.OuterMain, 1, 4)
    shadow.setPixelColor(ShadowColor.OuterMain, 2, 3)
    shadow.setPixelColor(ShadowColor.OuterMain, 3, 2)
    shadow.setPixelColor(ShadowColor.OuterMain, 4, 1)

    shadow.setPixelColor(ShadowColor.OuterMain, 1, 5)
    shadow.setPixelColor(ShadowColor.OuterMain, 5, 1)

    shadow.setPixelColor(ShadowColor.OuterSub, 1, 6)
    shadow.setPixelColor(ShadowColor.OuterSub, 6, 1)

    shadow.setPixelColor(ShadowColor.OuterMain, 1, 7)
    shadow.setPixelColor(ShadowColor.OuterMain, 7, 1)

    const quarter = shadow.clone()
    shadow.composite(quarter.clone().rotate(90), 0, -1)
    shadow.composite(quarter.clone().rotate(180), -1, -1)
    shadow.composite(quarter.clone().rotate(270), -1, 0)

    return shadow
  }

  #innerShadow(): Jimp {
    const shadow = new Jimp(16, 16)

    shadow.setPixelColor(ShadowColor.InnerSub3, 2, 4)
    shadow.setPixelColor(ShadowColor.InnerSub3, 3, 3)
    shadow.setPixelColor(ShadowColor.InnerSub3, 4, 2)

    shadow.setPixelColor(ShadowColor.InnerSub2, 2, 5)
    shadow.setPixelColor(ShadowColor.InnerSub2, 3, 4)
    shadow.setPixelColor(ShadowColor.InnerSub2, 4, 3)
    shadow.setPixelColor(ShadowColor.InnerSub2, 5, 2)

    shadow.setPixelColor(ShadowColor.InnerSub2, 2, 6)
    shadow.setPixelColor(ShadowColor.InnerSub2, 3, 5)
    shadow.setPixelColor(ShadowColor.InnerSub1, 4, 4)
    shadow.setPixelColor(ShadowColor.InnerSub2, 5, 3)
    shadow.setPixelColor(ShadowColor.InnerSub2, 6, 2)

    shadow.setPixelColor(ShadowColor.InnerSub2, 2, 7)
    shadow.setPixelColor(ShadowColor.InnerSub1, 3, 6)
    shadow.setPixelColor(ShadowColor.InnerMain, 4, 5)
    shadow.setPixelColor(ShadowColor.InnerMain, 5, 4)
    shadow.setPixelColor(ShadowColor.InnerSub1, 6, 3)
    shadow.setPixelColor(ShadowColor.InnerSub2, 7, 2)

    shadow.setPixelColor(ShadowColor.InnerMain, 3, 7)
    shadow.setPixelColor(ShadowColor.InnerMain, 4, 6)
    shadow.setPixelColor(ShadowColor.InnerMain, 5, 5)
    shadow.setPixelColor(ShadowColor.InnerMain, 6, 4)
    shadow.setPixelColor(ShadowColor.InnerMain, 7, 3)

    shadow.setPixelColor(ShadowColor.InnerMain, 4, 7)
    shadow.setPixelColor(ShadowColor.InnerMain, 5, 6)
    shadow.setPixelColor(ShadowColor.InnerMain, 6, 5)
    shadow.setPixelColor(ShadowColor.InnerMain, 7, 4)

    shadow.setPixelColor(ShadowColor.InnerMain, 5, 7)
    shadow.setPixelColor(ShadowColor.InnerMain, 6, 6)
    shadow.setPixelColor(ShadowColor.InnerMain, 7, 5)

    shadow.setPixelColor(ShadowColor.InnerMain, 6, 7)
    shadow.setPixelColor(ShadowColor.InnerMain, 7, 6)

    shadow.setPixelColor(ShadowColor.InnerMain, 7, 7)

    const quarter = shadow.clone()
    shadow.composite(quarter.clone().rotate(90), 0, -1)
    shadow.composite(quarter.clone().rotate(180), -1, -1)
    shadow.composite(quarter.clone().rotate(270), -1, 0)

    return shadow
  }
}
