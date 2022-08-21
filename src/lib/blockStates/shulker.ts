import { ShulkerType } from '../common'

import type { BlockStates } from './common'

export class ShulkerGenerator {
  #namespace: string
  #material: string

  constructor(projectNamespace: string, materialName: string) {
    this.#namespace = projectNamespace
    this.#material = materialName
  }

  generate(type: ShulkerType): BlockStates {
    const states: BlockStates = {
      variants: {
        '': {
          model: `${this.#namespace}:block/${type === 'default' ? '' : `${type}_`}${this.#material}_shulker_box`,
        },
      },
    }

    return states
  }
}
