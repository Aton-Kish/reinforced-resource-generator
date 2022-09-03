import { ShulkerType } from '@/lib/common'

import { BlockModelGenerator } from './common'

import type { BlockModel } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerBlockModelGenerator extends BlockModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

    this.#project = project
    this.#material = material
  }

  generate(type: ShulkerType): BlockModel {
    const model: BlockModel = {
      textures: {
        particle: `minecraft:block/${type === ShulkerType.Default ? '' : `${type}_`}shulker_box`,
      },
    }

    return model
  }

  path(type: ShulkerType): string {
    return `assets/${this.#project.namespace}/models/block/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }
}
