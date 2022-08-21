import { ShulkerType } from '../common'

import type { BlockState } from './common'

export class ShulkerGenerator {
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
          model: `${this.#namespace}:block/${type === 'default' ? '' : `${type}_`}${this.#material}_shulker_box`,
        },
      },
    }

    return states
  }
}
