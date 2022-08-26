import { ShulkerType } from '@/lib/common'

import type { BlockModel } from './common'

export class ShulkerGenerator {
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
