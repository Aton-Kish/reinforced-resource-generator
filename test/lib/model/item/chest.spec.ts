import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { ChestItemModelGenerator } from '@/lib/model/item'

import CopperChestItemModel from './data/reinfchest/copper_chest.json'
import DiamondChestItemModel from './data/reinfchest/diamond_chest.json'

import type { ProjectConfig } from '@/lib/common'
import type { ItemModel } from '@/lib/model/item'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestItemModelGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: ItemModel
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestItemModel,
      },
      {
        name: 'positive case: reinfchest:diamond_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: DiamondChestItemModel,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestItemModelGenerator(project, material)

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
        name: 'positive case: reinfchest:copper_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: 'assets/reinfchest/models/item/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_chest',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/models/item/diamond_chest.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestItemModelGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
