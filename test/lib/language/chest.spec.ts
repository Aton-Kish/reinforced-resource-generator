import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { ChestLanguageGenerator } from '@/lib/language'

import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestLanguageGenerator', () => {
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
        expected: 'assets/reinfchest/lang/en_us.json',
      },
      {
        name: 'positive case: reinfstorage',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/lang/en_us.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestLanguageGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
