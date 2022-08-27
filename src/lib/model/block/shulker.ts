import { ShulkerType } from '@/lib/common'

import type { BlockModel, BlockModelGenerator } from './common'

export class ShulkerBlockModelGenerator implements BlockModelGenerator {
  constructor() {}

  generate(type: ShulkerType): BlockModel {
    const states: BlockModel = {
      textures: {
        particle: `minecraft:block/${type === ShulkerType.Default ? '' : `${type}_`}shulker_box`,
      },
    }

    return states
  }
}
