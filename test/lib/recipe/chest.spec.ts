import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ChestRecipeGenerator } from '@/lib/recipe'

import CopperChestRecipe from './data/reinfchest/copper_chest.json'
import DiamondChestRecipe from './data/reinfchest/diamond_chest.json'

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
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestRecipe,
      },
      {
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: DiamondChestRecipe,
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
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: 'data/recipes/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'data/recipes/diamond_chest.json',
      },
      {
        name: 'positive case: exstorage',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        expected: 'data/recipes/netherite_chest_smithing.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestRecipeGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
