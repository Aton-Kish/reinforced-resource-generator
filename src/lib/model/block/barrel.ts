import { BarrelType } from '@/lib/common'

import type { BlockModel } from './common'

export class BarrelGenerator {
  #namespace: string
  #material: string

  constructor(projectNamespace: string, materialName: string) {
    this.#namespace = projectNamespace
    this.#material = materialName
  }

  generate(type: BarrelType): BlockModel {
    switch (type) {
      case BarrelType.Top:
        return this.#top()
      case BarrelType.TopOpen:
        return this.#topOpen()
      default:
        throw new Error('invalid barrel type')
    }
  }

  #top(): BlockModel {
    const model: BlockModel = {
      parent: 'minecraft:block/cube_bottom_top',
      textures: {
        top: `${this.#namespace}:block/${this.#material}_barrel_top`,
        bottom: `${this.#namespace}:block/${this.#material}_barrel_bottom`,
        side: `${this.#namespace}:block/${this.#material}_barrel_side`,
      },
    }

    return model
  }

  #topOpen(): BlockModel {
    const model: BlockModel = {
      parent: 'minecraft:block/cube_bottom_top',
      textures: {
        top: `${this.#namespace}:block/${this.#material}_barrel_top_open`,
        bottom: `${this.#namespace}:block/${this.#material}_barrel_bottom`,
        side: `${this.#namespace}:block/${this.#material}_barrel_side`,
      },
    }

    return model
  }
}
