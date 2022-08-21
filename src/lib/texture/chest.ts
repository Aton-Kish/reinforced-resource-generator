import Jimp from 'jimp'

import { ChestType } from '../common'

import { Material9 } from './material'

const SHADOW_INNER_COLOR = Jimp.rgbaToInt(0, 0, 0, 153)
const SHADOW_KNOB_MAIN_COLOR = Jimp.rgbaToInt(0, 0, 0, 102)
const SHADOW_KNOB_SUB_COLOR = Jimp.rgbaToInt(0, 0, 0, 26)

export type ChestBaseTextures = {
  [type in ChestType]: Jimp
}

export class ChestGenerator {
  #base: ChestBaseTextures
  #material9: Material9

  constructor(base: ChestBaseTextures, material: Jimp) {
    for (const [type, image] of Object.entries(base)) {
      if (!(image.getWidth() === 64 && image.getHeight() === 64)) {
        throw new Error(`${type} image size must be 64x64`)
      }
    }

    this.#base = base
    this.#material9 = new Material9(material)
  }

  generate(type: ChestType): Jimp {
    switch (type) {
      case ChestType.Single:
        return this.#single()
      case ChestType.Left:
        return this.#left()
      case ChestType.Right:
        return this.#right()
    }
  }

  #single(): Jimp {
    const singleSide = this.#material9.rect(12, 12)
    const singleMirror = singleSide.clone().mirror(true, false)
    const singleTop = this.#material9.rect(12, 3)
    const singleBottom = this.#material9.rect(12, 8)

    const shadow = this.#singleShadow()

    const image = this.#base.single.clone()

    image.composite(singleSide, 15, 1)
    image.composite(singleMirror, 29, 1)

    image.composite(singleTop, 1, 15)
    image.composite(singleTop, 15, 15)
    image.composite(singleTop, 29, 15)
    image.composite(singleTop, 43, 15)

    image.composite(singleSide, 15, 20)
    image.composite(singleSide, 29, 20)

    image.composite(singleBottom, 1, 34)
    image.composite(singleBottom, 15, 34)
    image.composite(singleBottom, 29, 34)
    image.composite(singleBottom, 43, 34)

    image.composite(shadow, 0, 0)

    return image
  }

  #left(): Jimp {
    const singleTop = this.#material9.rect(12, 3)
    const singleBottom = this.#material9.rect(12, 8)

    const doubleSide = this.#material9.rect(28, 12)
    const doubleTop = this.#material9.rect(28, 3)
    const doubleBottom = this.#material9.rect(28, 8)

    const leftSide = doubleSide.clone().crop(0, 0, 14, 12)
    const leftMirror = leftSide.clone().mirror(true, false)
    const leftTop = doubleTop.clone().crop(0, 0, 14, 3)
    const leftBottom = doubleBottom.clone().crop(0, 0, 14, 8)

    const rightSide = doubleSide.clone().crop(14, 0, 14, 12)
    const rightTop = doubleTop.clone().crop(14, 0, 14, 3)
    const rightBottom = doubleBottom.clone().crop(14, 0, 14, 8)

    const shadow = this.#leftShadow()

    const image = this.#base.left.clone()

    image.composite(rightSide, 14, 1)
    image.composite(leftMirror, 29, 1)

    image.composite(rightTop, 14, 15)
    image.composite(singleTop, 30, 15)
    image.composite(leftTop, 44, 15)

    image.composite(rightSide, 14, 20)
    image.composite(rightSide, 29, 20)

    image.composite(rightBottom, 14, 34)
    image.composite(singleBottom, 30, 34)
    image.composite(leftBottom, 44, 34)

    image.composite(shadow, 0, 0)

    return image
  }

  #right(): Jimp {
    const singleTop = this.#material9.rect(12, 3)
    const singleBottom = this.#material9.rect(12, 8)

    const doubleSide = this.#material9.rect(28, 12)
    const doubleTop = this.#material9.rect(28, 3)
    const doubleBottom = this.#material9.rect(28, 8)

    const leftSide = doubleSide.clone().crop(0, 0, 14, 12)
    const leftTop = doubleTop.clone().crop(0, 0, 14, 3)
    const leftBottom = doubleBottom.clone().crop(0, 0, 14, 8)

    const rightSide = doubleSide.clone().crop(14, 0, 14, 12)
    const rightMirror = rightSide.clone().mirror(true, false)

    const rightTop = doubleTop.clone().crop(14, 0, 14, 3)
    const rightBottom = doubleBottom.clone().crop(14, 0, 14, 8)

    const shadow = this.#rightShadow()

    const image = this.#base.right.clone()

    image.composite(leftSide, 15, 1)
    image.composite(rightMirror, 30, 1)

    image.composite(singleTop, 1, 15)
    image.composite(leftTop, 15, 15)
    image.composite(rightTop, 43, 15)

    image.composite(leftSide, 15, 20)
    image.composite(leftSide, 30, 20)

    image.composite(singleBottom, 1, 34)
    image.composite(leftBottom, 15, 34)
    image.composite(rightBottom, 43, 34)

    image.composite(shadow, 0, 0)

    return image
  }

  #singleShadow(): Jimp {
    const shadow = new Jimp(64, 64)

    const inner = new Jimp(10, 10, SHADOW_INNER_COLOR)
    shadow.composite(inner, 16, 2)

    const black = new Jimp(10, 10, 'black')
    shadow.composite(black, 30, 21)

    this.#setLeftKnobShadow(shadow, 47, 15)
    this.#setRightKnobShadow(shadow, 49, 15)

    return shadow
  }

  #leftShadow(): Jimp {
    const shadow = new Jimp(64, 64)

    const inner = new Jimp(13, 10, SHADOW_INNER_COLOR)
    shadow.composite(inner, 14, 2)

    const black = new Jimp(13, 10, 'black')
    shadow.composite(black, 29, 21)

    this.#setLeftKnobShadow(shadow, 56, 15)

    return shadow
  }

  #rightShadow(): Jimp {
    const shadow = new Jimp(64, 64)

    const inner = new Jimp(13, 10, SHADOW_INNER_COLOR)
    shadow.composite(inner, 16, 2)

    const black = new Jimp(13, 10, 'black')
    shadow.composite(black, 31, 21)

    this.#setRightKnobShadow(shadow, 43, 15)

    return shadow
  }

  #setLeftKnobShadow(image: Jimp, x: number, y: number): Jimp {
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x, y)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x + 1, y)
    image.setPixelColor(SHADOW_KNOB_SUB_COLOR, x, y + 1)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x + 1, y + 1)
    image.setPixelColor(SHADOW_KNOB_SUB_COLOR, x + 1, y + 2)

    image.setPixelColor(SHADOW_KNOB_SUB_COLOR, x, y + 25)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x + 1, y + 25)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x, y + 26)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x + 1, y + 26)

    return image
  }

  #setRightKnobShadow(image: Jimp, x: number, y: number): Jimp {
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x, y)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x + 1, y)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x, y + 1)
    image.setPixelColor(SHADOW_KNOB_SUB_COLOR, x + 1, y + 1)
    image.setPixelColor(SHADOW_KNOB_SUB_COLOR, x, y + 2)

    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x, y + 25)
    image.setPixelColor(SHADOW_KNOB_SUB_COLOR, x + 1, y + 25)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x, y + 26)
    image.setPixelColor(SHADOW_KNOB_MAIN_COLOR, x + 1, y + 26)

    return image
  }
}
