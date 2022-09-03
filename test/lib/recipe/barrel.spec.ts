import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { BarrelRecipeGenerator } from '@/lib/recipe'

import CopperBarrelCraftingRecipe from './data/reinfbarrel/copper_barrel.json'
import DiamondBarrelCraftingRecipe from './data/reinfbarrel/diamond_barrel.json'
import NetheriteBarrelSmithingRecipe from './data/reinfbarrel/netherite_barrel_smithing.json'

import type { Constructable } from '#/types'
import type { ProjectConfig } from '@/lib/common'
import type { Recipe } from '@/lib/recipe'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelRecipeGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: Recipe
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: CopperBarrelCraftingRecipe,
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: DiamondBarrelCraftingRecipe,
      },
      {
        name: 'positive case: reinfbarrel:netherite_barrel smithing',
        project: { namespace: 'reinfbarrel' },
        material: MaterialNetheriteTexture,
        expected: NetheriteBarrelSmithingRecipe,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelRecipeGenerator(project, material)

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
        expected: 'data/recipes/copper_barrel.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel crafting',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'data/recipes/diamond_barrel.json',
      },
      {
        name: 'positive case: exstorage:netherite_barrel smithing',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        expected: 'data/recipes/netherite_barrel_smithing.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelRecipeGenerator(project, material)

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
        name: 'positive case: reinfbarrel:copper_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: {
          path: 'data/recipes/copper_barrel.json',
          data: CopperBarrelCraftingRecipe,
        },
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel crafting',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'data/recipes/diamond_barrel.json',
          data: DiamondBarrelCraftingRecipe,
        },
      },
      {
        name: 'positive case: reinfbarrel:netherite_barrel smithing',
        project: { namespace: 'reinfbarrel' },
        material: MaterialNetheriteTexture,
        expected: {
          path: 'data/recipes/netherite_barrel_smithing.json',
          data: NetheriteBarrelSmithingRecipe,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new BarrelRecipeGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case', async () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }
      const material = MaterialCopperTexture
      const generator = new BarrelRecipeGenerator(project, material)

      const zip = await generator.zip(new JSZip())
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected)
    })
  })
})
