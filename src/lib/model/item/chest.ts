import type { ItemModel } from './common'

export class ChestGenerator {
  #namespace: string
  #material: string

  constructor(materialNamespace: string, materialName: string) {
    this.#namespace = materialNamespace
    this.#material = materialName
  }

  generate(): ItemModel {
    const states: ItemModel = {
      parent: 'minecraft:builtin/entity',
      textures: {
        particle: `${this.#namespace}:block/${this.#material}_block`,
      },
      display: {
        gui: {
          rotation: [30, 45, 0],
          translation: [0, 0, 0],
          scale: [0.625, 0.625, 0.625],
        },
        ground: {
          rotation: [0, 0, 0],
          translation: [0, 3, 0],
          scale: [0.25, 0.25, 0.25],
        },
        head: {
          rotation: [0, 180, 0],
          translation: [0, 0, 0],
          scale: [1, 1, 1],
        },
        fixed: {
          rotation: [0, 180, 0],
          translation: [0, 0, 0],
          scale: [0.5, 0.5, 0.5],
        },
        thirdperson_righthand: {
          rotation: [75, 315, 0],
          translation: [0, 2.5, 0],
          scale: [0.375, 0.375, 0.375],
        },
        firstperson_righthand: {
          rotation: [0, 315, 0],
          translation: [0, 0, 0],
          scale: [0.4, 0.4, 0.4],
        },
      },
    }

    return states
  }
}