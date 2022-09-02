import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ChestType } from '@/lib/common'
import { ChestTextureGenerator } from '@/lib/texture'

import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestTextureGenerator', () => {
  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: ChestType
      expected: string
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest single',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        type: ChestType.Single,
        expected: 'assets/reinfchest/textures/entity/reinforced_chest/copper/single.png',
      },
      {
        name: 'positive case: reinfstorage:diamond_chest left',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: ChestType.Left,
        expected: 'assets/reinfstorage/textures/entity/reinforced_chest/diamond/left.png',
      },
      {
        name: 'positive case: exstorage:netherite_chest right',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        type: ChestType.Right,
        expected: 'assets/exstorage/textures/entity/reinforced_chest/netherite/right.png',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new ChestTextureGenerator(project, material)

      const actual = generator.path(type)
      expect(actual).toBe(expected)
    })
  })
})
