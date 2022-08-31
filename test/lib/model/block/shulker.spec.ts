import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ShulkerType } from '@/lib/common'
import { ShulkerBlockModelGenerator } from '@/lib/model/block'

import CopperShulkerBoxBlockModel from './data/reinfshulker/copper_shulker_box.json'
import GrayDiamondShulkerBoxBlockModel from './data/reinfshulker/gray_diamond_shulker_box.json'
import LightGrayNetheriteShulkerBoxBlockModel from './data/reinfshulker/light_gray_netherite_shulker_box.json'

import type { ProjectConfig } from '@/lib/common'
import type { BlockModel } from '@/lib/model/block'
import type { MaterialTexture } from '@/lib/texture'

describe('ShulkerBlockModelGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: ShulkerType
      expected: BlockModel
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        type: ShulkerType.Default,
        expected: CopperShulkerBoxBlockModel,
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialDiamondTexture,
        type: ShulkerType.Gray,
        expected: GrayDiamondShulkerBoxBlockModel,
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialNetheriteTexture,
        type: ShulkerType.LightGray,
        expected: LightGrayNetheriteShulkerBoxBlockModel,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new ShulkerBlockModelGenerator(project, material)

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
        expected: 'assets/reinfshulker/models/block/copper_shulker_box.json',
      },
      {
        name: 'positive case: reinfstorage:gray_diamond_shulker_box',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: ShulkerType.Gray,
        expected: 'assets/reinfstorage/models/block/gray_diamond_shulker_box.json',
      },
      {
        name: 'positive case: exstorage:light_gray_netherite_shulker_box',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        type: ShulkerType.LightGray,
        expected: 'assets/exstorage/models/block/light_gray_netherite_shulker_box.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new ShulkerBlockModelGenerator(project, material)

      const actual = generator.path(type)
      expect(actual).toBe(expected)
    })
  })
})
