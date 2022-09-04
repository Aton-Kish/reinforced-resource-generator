import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { BarrelLootTableGenerator } from '@/lib/lootTable'

import CopperBarrelLootTable from './data/reinfbarrel/copper_barrel.json'
import DiamondBarrelLootTable from './data/reinfbarrel/diamond_barrel.json'

import type { Constructable } from '#/types'
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

  describe('async zip()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: {
        path: string
        data: LootTable
      }
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: {
          path: 'data/reinfbarrel/loot_tables/blocks/copper_barrel.json',
          data: CopperBarrelLootTable,
        },
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'data/reinfbarrel/loot_tables/blocks/diamond_barrel.json',
          data: DiamondBarrelLootTable,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new BarrelLootTableGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case: already exists', async () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }
      const material = MaterialCopperTexture
      const generator = new BarrelLootTableGenerator(project, material)

      const zip = await generator.zip(new JSZip())
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected)
    })
  })
})
