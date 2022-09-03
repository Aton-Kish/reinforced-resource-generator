import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ShulkerAdvancementGenerator } from '@/lib/advancement'
import { ShulkerUpgradeFrom } from '@/lib/common'

import CopperShulkerBoxCraftingAdvancement from './data/reinfshulker/copper_shulker_box.json'
import CopperShulkerBoxFromChestAdvancement from './data/reinfshulker/copper_shulker_box_from_copper_chest.json'
import DiamondShulkerBoxCraftingAdvancement from './data/reinfshulker/diamond_shulker_box.json'
import DiamondShulkerBoxFromChestAdvancement from './data/reinfshulker/diamond_shulker_box_from_diamond_chest.json'
import NetheriteShulkerBoxFromChestAdvancement from './data/reinfshulker/netherite_shulker_box_from_netherite_chest.json'
import NetheriteShulkerBoxSmithingAdvancement from './data/reinfshulker/netherite_shulker_box_smithing.json'

import type { Constructable } from '#/types'
import type { Advancement } from '@/lib/advancement'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ShulkerAdvancementGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      chestProject: ProjectConfig
      material: MaterialTexture
      from: ShulkerUpgradeFrom
      expected: Advancement
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: CopperShulkerBoxCraftingAdvancement,
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: DiamondShulkerBoxCraftingAdvancement,
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box smithing',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: NetheriteShulkerBoxSmithingAdvancement,
      },
      {
        name: 'positive case: reinfshulker:copper_shulker_box from reinfchest:copper_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: CopperShulkerBoxFromChestAdvancement,
      },
      {
        name: 'positive case: reinfshulker:diamond_shulker_box from reinfchest:diamond_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: DiamondShulkerBoxFromChestAdvancement,
      },
      {
        name: 'positive case: reinfshulker:netherite_shulker_box from reinfchest:netherite_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: NetheriteShulkerBoxFromChestAdvancement,
      },
    ]

    it.each(positiveCases)('$name', ({ project, chestProject, material, from, expected }) => {
      const generator = new ShulkerAdvancementGenerator(project, chestProject, material)

      const actual = generator.generate(from)
      expect(actual).toStrictEqual(expected)
    })
  })

  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      chestProject: ProjectConfig
      material: MaterialTexture
      from: ShulkerUpgradeFrom
      expected: string
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: 'data/reinfshulker/advancements/recipes/decorations/copper_shulker_box.json',
      },
      {
        name: 'positive case: reinfstorage:gray_diamond_shulker_box crafting',
        project: { namespace: 'reinfstorage' },
        chestProject: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: 'data/reinfstorage/advancements/recipes/decorations/diamond_shulker_box.json',
      },
      {
        name: 'positive case: exstorage:light_gray_netherite_shulker_box smithing',
        project: { namespace: 'exstorage' },
        chestProject: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: 'data/exstorage/advancements/recipes/decorations/netherite_shulker_box_smithing.json',
      },
      {
        name: 'positive case: reinfshulker:copper_shulker_box from reinfchest:copper_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/reinfshulker/advancements/recipes/decorations/copper_shulker_box_from_copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_shulker_box from reinfstorage:diamond_chest',
        project: { namespace: 'reinfstorage' },
        chestProject: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/reinfstorage/advancements/recipes/decorations/diamond_shulker_box_from_diamond_chest.json',
      },
      {
        name: 'positive case: exstorage:netherite_shulker_box from exstorage:netherite_chest',
        project: { namespace: 'exstorage' },
        chestProject: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/exstorage/advancements/recipes/decorations/netherite_shulker_box_from_netherite_chest.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, chestProject, material, from, expected }) => {
      const generator = new ShulkerAdvancementGenerator(project, chestProject, material)

      const actual = generator.path(from)
      expect(actual).toBe(expected)
    })
  })

  describe('async zip()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      chestProject: ProjectConfig
      material: MaterialTexture
      from: ShulkerUpgradeFrom
      expected: {
        path: string
        data: Advancement
      }
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: {
          path: 'data/reinfshulker/advancements/recipes/decorations/copper_shulker_box.json',
          data: CopperShulkerBoxCraftingAdvancement,
        },
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: {
          path: 'data/reinfshulker/advancements/recipes/decorations/diamond_shulker_box.json',
          data: DiamondShulkerBoxCraftingAdvancement,
        },
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box smithing',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: {
          path: 'data/reinfshulker/advancements/recipes/decorations/netherite_shulker_box_smithing.json',
          data: NetheriteShulkerBoxSmithingAdvancement,
        },
      },
      {
        name: 'positive case: reinfshulker:copper_shulker_box from reinfchest:copper_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: {
          path: 'data/reinfshulker/advancements/recipes/decorations/copper_shulker_box_from_copper_chest.json',
          data: CopperShulkerBoxFromChestAdvancement,
        },
      },
      {
        name: 'positive case: reinfshulker:diamond_shulker_box from reinfchest:diamond_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: {
          path: 'data/reinfshulker/advancements/recipes/decorations/diamond_shulker_box_from_diamond_chest.json',
          data: DiamondShulkerBoxFromChestAdvancement,
        },
      },
      {
        name: 'positive case: reinfshulker:netherite_shulker_box from reinfchest:netherite_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: {
          path: 'data/reinfshulker/advancements/recipes/decorations/netherite_shulker_box_from_netherite_chest.json',
          data: NetheriteShulkerBoxFromChestAdvancement,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, chestProject, material, from, expected }) => {
      const generator = new ShulkerAdvancementGenerator(project, chestProject, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip, from)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case', async () => {
      const project: ProjectConfig = { namespace: 'reinfshulker' }
      const chestProject: ProjectConfig = { namespace: 'reinfchest' }
      const material = MaterialCopperTexture
      const from = ShulkerUpgradeFrom.Shulker
      const generator = new ShulkerAdvancementGenerator(project, chestProject, material)

      const zip = await generator.zip(new JSZip(), from)
      const expected = new Error(`file already exists: ${generator.path(from)}`)
      expect(async () => await generator.zip(zip, from)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip, from)).rejects.toThrow(expected)
    })
  })
})
