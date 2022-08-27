import { ShulkerType } from '@/lib/common'

import type { BlockModel, BlockModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerBlockModelGenerator implements BlockModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(type: ShulkerType): BlockModel {
    const states: BlockModel = {
      textures: {
        particle: `minecraft:block/${type === ShulkerType.Default ? '' : `${type}_`}shulker_box`,
      },
    }

    return states
  }
}
