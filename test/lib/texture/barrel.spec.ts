import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { BarrelType } from '@/lib/common'
import { BarrelTextureGenerator } from '@/lib/texture'

import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelTextureGenerator', () => {
  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: BarrelType
      expected: string
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel top',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        type: BarrelType.Top,
        expected: 'assets/reinfbarrel/textures/block/copper_barrel_top.png',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel top open',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: BarrelType.TopOpen,
        expected: 'assets/reinfstorage/textures/block/diamond_barrel_top_open.png',
      },
      {
        name: 'positive case: exstorage:netherite_barrel bottom',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        type: BarrelType.Bottom,
        expected: 'assets/exstorage/textures/block/netherite_barrel_bottom.png',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new BarrelTextureGenerator(project, material)

      const actual = generator.path(type)
      expect(actual).toBe(expected)
    })
  })
})
