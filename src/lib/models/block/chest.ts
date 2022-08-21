import type { BlockModel } from './common'

export class ChestGenerator {
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
