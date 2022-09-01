import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { ChestLootTableGenerator } from '@/lib/lootTable'

import CopperChestLootTable from './data/reinfchest/copper_chest.json'
import DiamondChestLootTable from './data/reinfchest/diamond_chest.json'

import type { ProjectConfig } from '@/lib/common'
import type { LootTable } from '@/lib/lootTable'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestLootTableGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: LootTable
    }[] = [
      {
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestLootTable,
      },
      {
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: DiamondChestLootTable,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestLootTableGenerator(project, material)

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
        expected: 'data/reinfchest/loot_tables/blocks/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'data/reinfstorage/loot_tables/blocks/diamond_chest.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestLootTableGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
