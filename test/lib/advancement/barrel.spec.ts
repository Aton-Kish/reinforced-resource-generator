import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { BarrelAdvancementGenerator } from '@/lib/advancement'

import CopperBarrelCraftingAdvancement from './data/reinfbarrel/copper_barrel.json'
import DiamondBarrelCraftingAdvancement from './data/reinfbarrel/diamond_barrel.json'
import NetheriteBarrelSmithingAdvancement from './data/reinfbarrel/netherite_barrel_smithing.json'

import type { Constructable } from '#/types'
import type { Advancement } from '@/lib/advancement'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelAdvancementGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: Advancement
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: CopperBarrelCraftingAdvancement,
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: DiamondBarrelCraftingAdvancement,
      },
      {
        name: 'positive case: reinfbarrel:netherite_barrel smithing',
        project: { namespace: 'reinfbarrel' },
        material: MaterialNetheriteTexture,
        expected: NetheriteBarrelSmithingAdvancement,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelAdvancementGenerator(project, material)

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
        name: 'positive case: reinfbarrel:copper_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: 'data/reinfbarrel/advancements/recipes/decorations/copper_barrel.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel crafting',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'data/reinfstorage/advancements/recipes/decorations/diamond_barrel.json',
      },
      {
        name: 'positive case: exstorage:netherite_barrel smithing',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        expected: 'data/exstorage/advancements/recipes/decorations/netherite_barrel_smithing.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelAdvancementGenerator(project, material)

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
        data: Advancement
      }
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: {
          path: 'data/reinfbarrel/advancements/recipes/decorations/copper_barrel.json',
          data: CopperBarrelCraftingAdvancement,
        },
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'data/reinfbarrel/advancements/recipes/decorations/diamond_barrel.json',
          data: DiamondBarrelCraftingAdvancement,
        },
      },
      {
        name: 'positive case: reinfbarrel:netherite_barrel smithing',
        project: { namespace: 'reinfbarrel' },
        material: MaterialNetheriteTexture,
        expected: {
          path: 'data/reinfbarrel/advancements/recipes/decorations/netherite_barrel_smithing.json',
          data: NetheriteBarrelSmithingAdvancement,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new BarrelAdvancementGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case', async () => {
      const project: ProjectConfig = { namespace: 'reinfbarrel' }
      const material = MaterialCopperTexture
      const generator = new BarrelAdvancementGenerator(project, material)

      const zip = await generator.zip(new JSZip())
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected)
    })
  })
})
