import JSZip from 'jszip'

import { BarrelType } from '@/lib/common'

import type { BlockModel, BlockModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class BarrelBlockModelGenerator implements BlockModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
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

  path(type: BarrelType): string {
    switch (type) {
      case BarrelType.Top:
        return `assets/${this.#project.namespace}/models/block/${this.#material.name}_barrel.json`
      case BarrelType.TopOpen:
        return `assets/${this.#project.namespace}/models/block/${this.#material.name}_barrel_open.json`
      default:
        throw new Error('invalid barrel type')
    }
  }

  zipSync(zip: JSZip, type: BarrelType): JSZip {
    const model = this.generate(type)
    const data = JSON.stringify(model, null, 2)

    const path = this.path(type)
    zip.file(path, data)

    return zip
  }

  #top(): BlockModel {
    const model: BlockModel = {
      parent: 'minecraft:block/cube_bottom_top',
      textures: {
        top: `${this.#project.namespace}:block/${this.#material.name}_barrel_top`,
        bottom: `${this.#project.namespace}:block/${this.#material.name}_barrel_bottom`,
        side: `${this.#project.namespace}:block/${this.#material.name}_barrel_side`,
      },
    }

    return model
  }

  #topOpen(): BlockModel {
    const model: BlockModel = {
      parent: 'minecraft:block/cube_bottom_top',
      textures: {
        top: `${this.#project.namespace}:block/${this.#material.name}_barrel_top_open`,
        bottom: `${this.#project.namespace}:block/${this.#material.name}_barrel_bottom`,
        side: `${this.#project.namespace}:block/${this.#material.name}_barrel_side`,
      },
    }

    return model
  }
}
