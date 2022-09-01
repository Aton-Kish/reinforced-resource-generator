import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { BarrelRecipeGenerator } from '@/lib/recipe'

import CopperBarrelRecipe from './data/reinfbarrel/copper_barrel.json'
import DiamondBarrelRecipe from './data/reinfbarrel/diamond_barrel.json'

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
        name: 'positive case: reinfbarrel:copper_barrel top',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: CopperBarrelRecipe,
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel top open',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: DiamondBarrelRecipe,
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
        name: 'positive case: reinfbarrel:copper_barrel top',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: 'data/recipes/copper_barrel.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel top open',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'data/recipes/diamond_barrel.json',
      },
      {
        name: 'positive case: exstorage',
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
})
