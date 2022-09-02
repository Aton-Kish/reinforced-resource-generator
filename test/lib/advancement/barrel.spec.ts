import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { BarrelAdvancementGenerator } from '@/lib/advancement'

import CopperBarrelCraftingAdvancement from './data/reinfbarrel/copper_barrel.json'
import DiamondBarrelCraftingAdvancement from './data/reinfbarrel/diamond_barrel.json'
import NetheriteBarrelSmithingAdvancement from './data/reinfbarrel/netherite_barrel_smithing.json'

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
})
