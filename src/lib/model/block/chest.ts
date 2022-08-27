import type { BlockModel, BlockModelGenerator } from './common'

export class ChestBlockModelGenerator implements BlockModelGenerator {
  #namespace: string
  #material: string

  constructor(materialNamespace: string, materialName: string) {
    this.#namespace = materialNamespace
    this.#material = materialName
  }

  generate(): BlockModel {
    const states: BlockModel = {
      textures: {
        particle: `${this.#namespace}:block/${this.#material}_block`,
      },
    }

    return states
  }
}
