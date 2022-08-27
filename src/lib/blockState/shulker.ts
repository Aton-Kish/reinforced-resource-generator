import { ShulkerType } from '@/lib/common'

import type { BlockState, BlockStateGenerator } from './common'

export class ShulkerBlockStateGenerator implements BlockStateGenerator {
  #namespace: string
  #material: string

  constructor(projectNamespace: string, materialName: string) {
    this.#namespace = projectNamespace
    this.#material = materialName
  }

  generate(type: ShulkerType): BlockState {
    const states: BlockState = {
      variants: {
        '': {
          model: `${this.#namespace}:block/${type === ShulkerType.Default ? '' : `${type}_`}${
            this.#material
          }_shulker_box`,
        },
      },
    }

    return states
  }
}
