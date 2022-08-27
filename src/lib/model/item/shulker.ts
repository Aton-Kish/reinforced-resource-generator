import { ShulkerType } from '@/lib/common'

import type { ItemModel, ItemModelGenerator } from './common'

export class ShulkerItemModelGenerator implements ItemModelGenerator {
  constructor() {}

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
