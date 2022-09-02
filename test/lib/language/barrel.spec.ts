import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { BarrelLanguageGenerator } from '@/lib/language'

import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelLanguageGenerator', () => {
  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: string
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: 'assets/reinfbarrel/lang/en_us.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/lang/en_us.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelLanguageGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
