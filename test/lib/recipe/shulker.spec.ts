import JSZip from 'jszip'

import { Constructable } from '#/types'
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
        expected: 'data/reinfshulker/recipes/copper_shulker_box.json',
      },
      {
        name: 'positive case: reinfstorage:gray_diamond_shulker_box crafting',
        project: { namespace: 'reinfstorage' },
        chestProject: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.Gray,
        expected: 'data/reinfstorage/recipes/gray_diamond_shulker_box.json',
      },
      {
        name: 'positive case: exstorage:light_gray_netherite_shulker_box smithing',
        project: { namespace: 'exstorage' },
        chestProject: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.LightGray,
        expected: 'data/exstorage/recipes/light_gray_netherite_shulker_box_smithing.json',
      },
      {
        name: 'positive case: reinfshulker:copper_shulker_box from reinfchest:copper_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/reinfshulker/recipes/copper_shulker_box_from_copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_shulker_box from reinfstorage:diamond_chest',
        project: { namespace: 'reinfstorage' },
        chestProject: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/reinfstorage/recipes/diamond_shulker_box_from_diamond_chest.json',
      },
      {
        name: 'positive case: exstorage:netherite_shulker_box from exstorage:netherite_chest',
        project: { namespace: 'exstorage' },
        chestProject: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: 'data/exstorage/recipes/netherite_shulker_box_from_netherite_chest.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, chestProject, material, from, type, expected }) => {
      const generator = new ShulkerRecipeGenerator(project, chestProject, material)

      const actual = generator.path(from, type)
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
      type?: ShulkerType
      expected: {
        path: string
        data: Recipe
      }
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.Default,
        expected: {
          path: 'data/reinfshulker/recipes/copper_shulker_box.json',
          data: CopperShulkerBoxCraftingRecipe,
        },
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box crafting',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.Gray,
        expected: {
          path: 'data/reinfshulker/recipes/gray_diamond_shulker_box.json',
          data: GrayDiamondShulkerBoxCraftingRecipe,
        },
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box smithing',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Shulker,
        type: ShulkerType.LightGray,
        expected: {
          path: 'data/reinfshulker/recipes/light_gray_netherite_shulker_box_smithing.json',
          data: LightGrayNetheriteShulkerBoxSmithingRecipe,
        },
      },
      {
        name: 'positive case: reinfshulker:copper_shulker_box from reinfchest:copper_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: {
          path: 'data/reinfshulker/recipes/copper_shulker_box_from_copper_chest.json',
          data: CopperShulkerBoxFromChestRecipe,
        },
      },
      {
        name: 'positive case: reinfshulker:diamond_shulker_box from reinfchest:diamond_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: {
          path: 'data/reinfshulker/recipes/diamond_shulker_box_from_diamond_chest.json',
          data: DiamondShulkerBoxFromChestRecipe,
        },
      },
      {
        name: 'positive case: reinfshulker:netherite_shulker_box from reinfchest:netherite_chest',
        project: { namespace: 'reinfshulker' },
        chestProject: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        from: ShulkerUpgradeFrom.Chest,
        expected: {
          path: 'data/reinfshulker/recipes/netherite_shulker_box_from_netherite_chest.json',
          data: NetheriteShulkerBoxFromChestRecipe,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, chestProject, material, from, type, expected }) => {
      const generator = new ShulkerRecipeGenerator(project, chestProject, material)

      const zip = new JSZip()

      const actual = type == null ? await generator.zip(zip, from) : await generator.zip(zip, from, type)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case', async () => {
      const project: ProjectConfig = { namespace: 'reinfshulker' }
      const chestProject: ProjectConfig = { namespace: 'reinfchest' }
      const material = MaterialCopperTexture
      const from = ShulkerUpgradeFrom.Shulker
      const type = ShulkerType.Default
      const generator = new ShulkerRecipeGenerator(project, chestProject, material)

      const zip = await generator.zip(new JSZip(), from, type)
      const expected = new Error(`file already exists: ${generator.path(from, type)}`)
      expect(async () => await generator.zip(zip, from, type)).rejects.toThrow(
        expected.constructor as Constructable<Error>,
      )
      expect(async () => await generator.zip(zip, from, type)).rejects.toThrow(expected)
    })
  })
})
