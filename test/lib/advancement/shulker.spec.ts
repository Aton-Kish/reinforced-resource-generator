import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ShulkerAdvancementGenerator } from '@/lib/advancement'
import { ShulkerUpgradeFrom } from '@/lib/common'

import CopperShulkerBoxCraftingAdvancement from './data/reinfshulker/copper_shulker_box.json'
import CopperShulkerBoxFromChestAdvancement from './data/reinfshulker/copper_shulker_box_from_copper_chest.json'
import DiamondShulkerBoxCraftingAdvancement from './data/reinfshulker/diamond_shulker_box.json'
import DiamondShulkerBoxFromChestAdvancement from './data/reinfshulker/diamond_shulker_box_from_diamond_chest.json'
import NetheriteShulkerBoxFromChestAdvancement from './data/reinfshulker/netherite_shulker_box_from_netherite_chest.json'
import NetheriteShulkerBoxSmithingAdvancement from './data/reinfshulker/netherite_shulker_box_smithing.json'

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
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: CopperShulkerBoxCraftingAdvancement,
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: DiamondShulkerBoxCraftingAdvancement,
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box',
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
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: 'data/reinfshulker/advancements/recipes/decorations/copper_shulker_box.json',
      },
      {
        name: 'positive case: reinfstorage:gray_diamond_shulker_box',
        project: { namespace: 'reinfstorage' },
        chestProject: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        expected: 'data/reinfstorage/advancements/recipes/decorations/diamond_shulker_box.json',
      },
      {
        name: 'positive case: exstorage:light_gray_netherite_shulker_box',
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
})
