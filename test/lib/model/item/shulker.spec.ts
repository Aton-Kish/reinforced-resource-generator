import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ShulkerType } from '@/lib/common'
import { ShulkerItemModelGenerator } from '@/lib/model/item'

import CopperShulkerBoxItemModel from './data/reinfshulker/copper_shulker_box.json'
import GrayDiamondShulkerBoxItemModel from './data/reinfshulker/gray_diamond_shulker_box.json'
import LightGrayNetheriteShulkerBoxItemModel from './data/reinfshulker/light_gray_netherite_shulker_box.json'

import type { ProjectConfig } from '@/lib/common'
import type { ItemModel } from '@/lib/model/item'
import type { MaterialTexture } from '@/lib/texture'

describe('ShulkerItemModelGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: ShulkerType
      expected: ItemModel
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        type: ShulkerType.Default,
        expected: CopperShulkerBoxItemModel,
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialDiamondTexture,
        type: ShulkerType.Gray,
        expected: GrayDiamondShulkerBoxItemModel,
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialNetheriteTexture,
        type: ShulkerType.LightGray,
        expected: LightGrayNetheriteShulkerBoxItemModel,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new ShulkerItemModelGenerator(project, material)

      const actual = generator.generate(type)
      expect(actual).toStrictEqual(expected)
    })
  })

  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: ShulkerType
      expected: string
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        type: ShulkerType.Default,
        expected: 'assets/reinfshulker/models/item/copper_shulker_box.json',
      },
      {
        name: 'positive case: reinfstorage:gray_diamond_shulker_box',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: ShulkerType.Gray,
        expected: 'assets/reinfstorage/models/item/gray_diamond_shulker_box.json',
      },
      {
        name: 'positive case: exstorage:light_gray_netherite_shulker_box',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        type: ShulkerType.LightGray,
        expected: 'assets/exstorage/models/item/light_gray_netherite_shulker_box.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new ShulkerItemModelGenerator(project, material)

      const actual = generator.path(type)
      expect(actual).toBe(expected)
    })
  })
})
