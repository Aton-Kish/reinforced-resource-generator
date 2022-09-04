import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture, MaterialNetheriteTexture } from '@/assets/material'
import { ShulkerBlockStateGenerator } from '@/lib/blockState'
import { ShulkerType } from '@/lib/common'

import CopperShulkerBoxBlockState from './data/reinfshulker/copper_shulker_box.json'
import GrayDiamondShulkerBoxBlockState from './data/reinfshulker/gray_diamond_shulker_box.json'
import LightGrayNetheriteShulkerBoxBlockState from './data/reinfshulker/light_gray_netherite_shulker_box.json'

import type { Constructable } from '#/types'
import type { BlockState } from '@/lib/blockState'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ShulkerBlockStateGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: ShulkerType
      expected: BlockState
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        type: ShulkerType.Default,
        expected: CopperShulkerBoxBlockState,
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialDiamondTexture,
        type: ShulkerType.Gray,
        expected: GrayDiamondShulkerBoxBlockState,
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialNetheriteTexture,
        type: ShulkerType.LightGray,
        expected: LightGrayNetheriteShulkerBoxBlockState,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new ShulkerBlockStateGenerator(project, material)

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
        expected: 'assets/reinfshulker/blockstates/copper_shulker_box.json',
      },
      {
        name: 'positive case: reinfstorage:gray_diamond_shulker_box',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: ShulkerType.Gray,
        expected: 'assets/reinfstorage/blockstates/gray_diamond_shulker_box.json',
      },
      {
        name: 'positive case: exstorage:light_gray_netherite_shulker_box',
        project: { namespace: 'exstorage' },
        material: MaterialNetheriteTexture,
        type: ShulkerType.LightGray,
        expected: 'assets/exstorage/blockstates/light_gray_netherite_shulker_box.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new ShulkerBlockStateGenerator(project, material)

      const actual = generator.path(type)
      expect(actual).toBe(expected)
    })
  })

  describe('async zip()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: ShulkerType
      expected: {
        path: string
        data: BlockState
      }
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        type: ShulkerType.Default,
        expected: {
          path: 'assets/reinfshulker/blockstates/copper_shulker_box.json',
          data: CopperShulkerBoxBlockState,
        },
      },
      {
        name: 'positive case: reinfshulker:gray_diamond_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialDiamondTexture,
        type: ShulkerType.Gray,
        expected: {
          path: 'assets/reinfshulker/blockstates/gray_diamond_shulker_box.json',
          data: GrayDiamondShulkerBoxBlockState,
        },
      },
      {
        name: 'positive case: reinfshulker:light_gray_netherite_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialNetheriteTexture,
        type: ShulkerType.LightGray,
        expected: {
          path: 'assets/reinfshulker/blockstates/light_gray_netherite_shulker_box.json',
          data: LightGrayNetheriteShulkerBoxBlockState,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, material, type, expected }) => {
      const generator = new ShulkerBlockStateGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip, type)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case: already exists', async () => {
      const project: ProjectConfig = { namespace: 'reinfshulker' }
      const material = MaterialCopperTexture
      const type = ShulkerType.Default
      const generator = new ShulkerBlockStateGenerator(project, material)

      const zip = await generator.zip(new JSZip(), type)
      const expected = new Error(`file already exists: ${generator.path(type)}`)
      expect(async () => await generator.zip(zip, type)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip, type)).rejects.toThrow(expected)
    })
  })
})
