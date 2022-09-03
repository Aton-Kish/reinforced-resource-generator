import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ChestRecipeGenerator } from '@/lib/recipe'

import CopperChestCraftingRecipe from './data/reinfchest/copper_chest.json'
import DiamondChestCraftingRecipe from './data/reinfchest/diamond_chest.json'
import NetheriteChestSmithingRecipe from './data/reinfchest/netherite_chest_smithing.json'

import type { Constructable } from '#/types'
import type { ProjectConfig } from '@/lib/common'
import type { Recipe } from '@/lib/recipe'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestRecipeGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: Recipe
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest crafting',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestCraftingRecipe,
      },
      {
        name: 'positive case: reinfchest:diamond_chest crafting',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: DiamondChestCraftingRecipe,
      },
      {
        name: 'positive case: reinfchest:netherite_chest smithing',
        project: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        expected: NetheriteChestSmithingRecipe,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestRecipeGenerator(project, material)

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
        name: 'positive case: reinfchest:copper_chest crafting',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: 'data/reinfchest/recipes/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_chest crafting',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'data/reinfstorage/recipes/diamond_chest.json',
      },
      {
        name: 'positive case: exstorage:netherite_chest smithing',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        expected: 'data/exstorage/recipes/netherite_chest_smithing.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestRecipeGenerator(project, material)

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
        data: Recipe
      }
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest crafting',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: {
          path: 'data/reinfchest/recipes/copper_chest.json',
          data: CopperChestCraftingRecipe,
        },
      },
      {
        name: 'positive case: reinfchest:diamond_chest crafting',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'data/reinfchest/recipes/diamond_chest.json',
          data: DiamondChestCraftingRecipe,
        },
      },
      {
        name: 'positive case: reinfchest:netherite_chest smithing',
        project: { namespace: 'reinfchest' },
        material: MaterialNetheriteTexture,
        expected: {
          path: 'data/reinfchest/recipes/netherite_chest_smithing.json',
          data: NetheriteChestSmithingRecipe,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new ChestRecipeGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case', async () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }
      const material = MaterialCopperTexture
      const generator = new ChestRecipeGenerator(project, material)

      const zip = await generator.zip(new JSZip())
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected)
    })
  })
})
