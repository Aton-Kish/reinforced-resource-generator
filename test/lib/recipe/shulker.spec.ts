import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ShulkerType, ShulkerUpgradeFrom } from '@/lib/common'
import { ShulkerRecipeGenerator } from '@/lib/recipe'

import CopperShulkerBoxCraftingRecipe from './data/reinfshulker/copper_shulker_box.json'
import CopperShulkerBoxFromChestRecipe from './data/reinfshulker/copper_shulker_box_from_copper_chest.json'
import DiamondShulkerBoxFromChestRecipe from './data/reinfshulker/diamond_shulker_box_from_diamond_chest.json'
import GrayDiamondShulkerBoxCraftingRecipe from './data/reinfshulker/gray_diamond_shulker_box.json'
import LightGrayNetheriteShulkerBoxSmithingRecipe from './data/reinfshulker/light_gray_netherite_shulker_box_smithing.json'
import NetheriteShulkerBoxFromChestRecipe from './data/reinfshulker/netherite_shulker_box_from_netherite_chest.json'

import type { ProjectConfig } from '@/lib/common'
import type { Recipe } from '@/lib/recipe'
import type { MaterialTexture } from '@/lib/texture'

describe('ShulkerRecipeGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      chestProject: ProjectConfig
      material: MaterialTexture
      from: ShulkerUpgradeFrom
      type?: ShulkerType
      expected: Recipe
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.Default,
        expected: CopperShulkerBoxCraftingRecipe,
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.Gray,
        expected: GrayDiamondShulkerBoxCraftingRecipe,
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box smithing',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.LightGray,
        expected: LightGrayNetheriteShulkerBoxSmithingRecipe,
      },
      {
        name: 'positive case: reinfshulker:copper_shulker_box from reinfchest:copper_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: CopperShulkerBoxFromChestRecipe,
      },
      {
        name: 'positive case: reinfshulker:diamond_shulker_box from reinfchest:diamond_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: DiamondShulkerBoxFromChestRecipe,
      },
      {
        name: 'positive case: reinfshulker:netherite_shulker_box from reinfchest:netherite_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: NetheriteShulkerBoxFromChestRecipe,
      },
    ]

    it.each(positiveCases)('$name', ({ project, chestProject, material, from, type, expected }) => {
      const generator = new ShulkerRecipeGenerator(project, chestProject, material)

      const actual = generator.generate(from, type)
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
      type?: ShulkerType
      expected: string
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.Default,
        expected: 'data/recipes/copper_shulker_box.json',
      },
      {
        name: 'positive case: reinfstorage:gray_diamond_shulker_box crafting',
        project: { namespace: 'reinfstorage' },
        chestProject: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.Gray,
        expected: 'data/recipes/gray_diamond_shulker_box.json',
      },
      {
        name: 'positive case: exstorage:light_gray_netherite_shulker_box smithing',
        project: { namespace: 'exstorage' },
        chestProject: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.LightGray,
        expected: 'data/recipes/light_gray_netherite_shulker_box_smithing.json',
      },
      {
        name: 'positive case: reinfshulker:copper_shulker_box from reinfchest:copper_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/recipes/copper_shulker_box_from_copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_shulker_box from reinfstorage:diamond_chest',
        project: { namespace: 'reinfstorage' },
        chestProject: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/recipes/diamond_shulker_box_from_diamond_chest.json',
      },
      {
        name: 'positive case: exstorage:netherite_shulker_box from exstorage:netherite_chest',
        project: { namespace: 'exstorage' },
        chestProject: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/recipes/netherite_shulker_box_from_netherite_chest.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, chestProject, material, from, type, expected }) => {
      const generator = new ShulkerRecipeGenerator(project, chestProject, material)

      const actual = generator.path(from, type)
      expect(actual).toBe(expected)
    })
  })
})
