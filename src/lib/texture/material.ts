import Jimp from 'jimp'

export class Material9 {
  // Corner
  #cornerTopLeft: Jimp
  #cornerTopRight: Jimp
  #cornerBottomRight: Jimp
  #cornerBottomLeft: Jimp
  // Side
  #sideTop: Jimp
  #sideRight: Jimp
  #sideBottom: Jimp
  #sideLeft: Jimp
  // Inner
  #inner: Jimp

  constructor(material: Jimp) {
    if (!(material.getWidth() === 16 && material.getHeight() === 16)) {
      throw new Error('material image size must be 16x16')
    }

    // Corner
    this.#cornerTopLeft = material.clone().crop(0, 0, 1, 1)
    this.#cornerTopRight = material.clone().crop(15, 0, 1, 1)
    this.#cornerBottomRight = material.clone().crop(15, 15, 1, 1)
    this.#cornerBottomLeft = material.clone().crop(0, 15, 1, 1)

    // Side
    this.#sideTop = material.clone().crop(1, 0, 14, 1)
    this.#sideRight = material.clone().crop(15, 1, 1, 14)
    this.#sideBottom = material.clone().crop(1, 15, 14, 1)
    this.#sideLeft = material.clone().crop(0, 1, 1, 14)

    // Inner
    this.#inner = material.clone().crop(1, 1, 14, 14)
  }

  rect(width: number, height: number): Jimp {
    const image = new Jimp(width, height)

    // Side
    image.composite(this.topSide(width), 0, 0)
    image.composite(this.rightSide(height), width - 1, 0)
    image.composite(this.bottomSide(width), 0, height - 1)
    image.composite(this.leftSide(height), 0, 0)

    // Inner
    image.composite(this.#inner!.clone().resize(width - 2, height - 2), 1, 1)

    return image
  }

  topSide(width: number): Jimp {
    const image = new Jimp(width, 1)

    image.composite(this.#cornerTopLeft!.clone(), 0, 0)
    image.composite(this.#sideTop!.clone().resize(width - 2, 1), 1, 0)
    image.composite(this.#cornerTopRight!.clone(), width - 1, 0)

    return image
  }

  rightSide(height: number): Jimp {
    const image = new Jimp(1, height)

    image.composite(this.#cornerTopRight!.clone(), 0, 0)
    image.composite(this.#sideRight!.clone().resize(1, height - 2), 0, 1)
    image.composite(this.#cornerBottomRight!.clone(), 0, height - 1)

    return image
  }

  bottomSide(width: number): Jimp {
    const image = new Jimp(width, 1)

    image.composite(this.#cornerBottomLeft!.clone(), 0, 0)
    image.composite(this.#sideBottom!.clone().resize(width - 2, 1), 1, 0)
    image.composite(this.#cornerBottomRight!.clone(), width - 1, 0)

    return image
  }

  leftSide(height: number): Jimp {
    const image = new Jimp(1, height)

    image.composite(this.#cornerTopLeft!.clone(), 0, 0)
    image.composite(this.#sideLeft!.clone().resize(1, height - 2), 0, 1)
    image.composite(this.#cornerBottomLeft!.clone(), 0, height - 1)

    return image
  }
}
