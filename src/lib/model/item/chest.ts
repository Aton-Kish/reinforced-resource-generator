import type { ItemModel, ItemModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class ChestItemModelGenerator implements ItemModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): ItemModel {
    const model: ItemModel = {
      parent: 'minecraft:builtin/entity',
      textures: {
        particle: `${this.#material.namespace}:block/${this.#material.name}_block`,
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

    return model
  }

  path(): string {
    return `assets/${this.#project.namespace}/models/item/${this.#material.name}_chest.json`
  }

  zipSync(zip: JSZip): JSZip {
    const path = this.path()
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const model = this.generate()
    const data = JSON.stringify(model, null, 2)

    zip.file(path, data)

    return zip
  }
}
