import type { BlockState } from './common'

export class BarrelGenerator {
  #namespace: string
  #material: string

  constructor(projectNamespace: string, materialName: string) {
    this.#namespace = projectNamespace
    this.#material = materialName
  }

  generate(): BlockState {
    const states: BlockState = {
      variants: {
        'facing=down,open=false': {
          x: 180,
          model: `${this.#namespace}:block/${this.#material}_barrel`,
        },
        'facing=down,open=true': {
          x: 180,
          model: `${this.#namespace}:block/${this.#material}_barrel_open`,
        },
        'facing=east,open=false': {
          x: 90,
          y: 90,
          model: `${this.#namespace}:block/${this.#material}_barrel`,
        },
        'facing=east,open=true': {
          x: 90,
          y: 90,
          model: `${this.#namespace}:block/${this.#material}_barrel_open`,
        },
        'facing=north,open=false': {
          x: 90,
          model: `${this.#namespace}:block/${this.#material}_barrel`,
        },
        'facing=north,open=true': {
          x: 90,
          model: `${this.#namespace}:block/${this.#material}_barrel_open`,
        },
        'facing=south,open=false': {
          x: 90,
          y: 180,
          model: `${this.#namespace}:block/${this.#material}_barrel`,
        },
        'facing=south,open=true': {
          x: 90,
          y: 180,
          model: `${this.#namespace}:block/${this.#material}_barrel_open`,
        },
        'facing=up,open=false': {
          model: `${this.#namespace}:block/${this.#material}_barrel`,
        },
        'facing=up,open=true': {
          model: `${this.#namespace}:block/${this.#material}_barrel_open`,
        },
        'facing=west,open=false': {
          x: 90,
          y: 270,
          model: `${this.#namespace}:block/${this.#material}_barrel`,
        },
        'facing=west,open=true': {
          x: 90,
          y: 270,
          model: `${this.#namespace}:block/${this.#material}_barrel_open`,
        },
      },
    }

    return states
  }
}
