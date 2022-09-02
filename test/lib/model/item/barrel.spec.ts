import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { BarrelItemModelGenerator } from '@/lib/model/item'

import CopperBarrelItemModel from './data/reinfbarrel/copper_barrel.json'
import DiamondBarrelItemModel from './data/reinfbarrel/diamond_barrel.json'

import type { ProjectConfig } from '@/lib/common'
import type { ItemModel } from '@/lib/model/item'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelItemModelGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: ItemModel
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel top',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: CopperBarrelItemModel,
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel top open',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: DiamondBarrelItemModel,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelItemModelGenerator(project, material)

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
        name: 'positive case: reinfbarrel:copper_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: 'assets/reinfbarrel/models/item/copper_barrel.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/models/item/diamond_barrel.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelItemModelGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
