import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { ChestItemModelGenerator } from '@/lib/model/item'

import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestItemModelGenerator', () => {
  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: string
    }[] = [
      {
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: 'assets/reinfchest/models/item/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/models/item/diamond_chest.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestItemModelGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
