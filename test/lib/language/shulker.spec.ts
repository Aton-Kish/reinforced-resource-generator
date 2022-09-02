import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { ShulkerLanguageGenerator } from '@/lib/language'

import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ShulkerLanguageGenerator', () => {
  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: string
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        expected: 'assets/reinfshulker/lang/en_us.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_shulker_box',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/lang/en_us.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ShulkerLanguageGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
