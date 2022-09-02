import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { BarrelLootTableGenerator } from '@/lib/lootTable'

import CopperBarrelLootTable from './data/reinfbarrel/copper_barrel.json'
import DiamondBarrelLootTable from './data/reinfbarrel/diamond_barrel.json'

import type { ProjectConfig } from '@/lib/common'
import type { LootTable } from '@/lib/lootTable'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelLootTableGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: LootTable
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: CopperBarrelLootTable,
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: DiamondBarrelLootTable,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelLootTableGenerator(project, material)

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
        name: 'positive case: reinfbarrel:copper_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: 'data/reinfbarrel/loot_tables/blocks/copper_barrel.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'data/reinfstorage/loot_tables/blocks/diamond_barrel.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelLootTableGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
