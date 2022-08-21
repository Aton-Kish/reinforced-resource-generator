import { BlockStates } from './common'

export class ChestGenerator {
  #namespace: string
  #material: string

  constructor(projectNamespace: string, materialName: string) {
    this.#namespace = projectNamespace
    this.#material = materialName
  }

  generate(): BlockStates {
    const states: BlockStates = {
      variants: {
        '': {
          model: `${this.#namespace}:block/${this.#material}_chest`,
        },
      },
    }

    return states
  }
}
