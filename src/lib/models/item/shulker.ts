import { ShulkerType } from '../../common'

import type { ItemModel } from './common'

export class ShulkerGenerator {
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
