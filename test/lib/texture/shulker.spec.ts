import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ShulkerType } from '@/lib/common'
import { ShulkerTextureGenerator } from '@/lib/texture'

import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ShulkerTextureGenerator', () => {
  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: ShulkerType
      expected: string
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        type: ShulkerType.Default,
        expected: 'assets/reinfshulker/textures/entity/reinforced_shulker/copper/shulker.png',
      },
      {
        name: 'positive case: reinfstorage:gray_diamond_shulker_box',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: ShulkerType.Gray,
        expected: 'assets/reinfstorage/textures/entity/reinforced_shulker/diamond/shulker_gray.png',
      },
      {
        name: 'positive case: exstorage:light_gray_netherite_shulker_box',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        type: ShulkerType.LightGray,
        expected: 'assets/exstorage/textures/entity/reinforced_shulker/netherite/shulker_light_gray.png',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new ShulkerTextureGenerator(project, material)

      const actual = generator.path(type)
      expect(actual).toBe(expected)
    })
  })
})
