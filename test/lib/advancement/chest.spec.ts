import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ChestAdvancementGenerator } from '@/lib/advancement'

import CopperChestAdvancement from './data/reinfchest/copper_chest.json'
import DiamondChestAdvancement from './data/reinfchest/diamond_chest.json'

import type { Advancement } from '@/lib/advancement'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestAdvancementGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: Advancement
    }[] = [
      {
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestAdvancement,
      },
      {
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: DiamondChestAdvancement,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestAdvancementGenerator(project, material)

      const actual = generator.generate()
      expect(actual).toStrictEqual(expected)
    })
  })

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
        expected: 'data/reinfchest/advancements/recipes/decorations/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'data/reinfstorage/advancements/recipes/decorations/diamond_chest.json',
      },
      {
        name: 'positive case: exstorage',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        expected: 'data/exstorage/advancements/recipes/decorations/netherite_chest_smithing.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestAdvancementGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
