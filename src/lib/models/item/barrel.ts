import type { ItemModel } from './common'

export class BarrelGenerator {
  #namespace: string
  #material: string

  constructor(projectNamespace: string, materialName: string) {
    this.#namespace = projectNamespace
    this.#material = materialName
  }

  generate(): ItemModel {
    const states: ItemModel = {
      parent: `${this.#namespace}:block/${this.#material}_barrel`,
    }

    return states
  }
}
