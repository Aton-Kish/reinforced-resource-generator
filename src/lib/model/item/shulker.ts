import { ShulkerType } from '@/lib/common'

import type { ItemModel, ItemModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerItemModelGenerator implements ItemModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(type: ShulkerType): ItemModel {
    const states: ItemModel = {
      parent: 'minecraft:item/template_shulker_box',
      textures: {
        particle: `minecraft:block/${type === ShulkerType.Default ? '' : `${type}_`}shulker_box`,
      },
    }

    return states
  }
}
