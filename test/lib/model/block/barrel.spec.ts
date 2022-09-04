import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { BarrelBlockModelGenerator, BlockModelBarrelType } from '@/lib/model/block'

import CopperBarrelBlockModel from './data/reinfbarrel/copper_barrel.json'
import DiamondBarrelOpenBlockModel from './data/reinfbarrel/diamond_barrel_open.json'

import type { Constructable } from '#/types'
import type { ProjectConfig } from '@/lib/common'
import type { BlockModel } from '@/lib/model/block'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelBlockModelGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: BlockModelBarrelType
      expected: BlockModel
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel top',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        type: BlockModelBarrelType.Top,
        expected: CopperBarrelBlockModel,
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel top open',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        type: BlockModelBarrelType.TopOpen,
        expected: DiamondBarrelOpenBlockModel,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new BarrelBlockModelGenerator(project, material)

      const actual = generator.generate(type)
      expect(actual).toStrictEqual(expected)
    })
  })

  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: BlockModelBarrelType
      expected: string
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel top',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        type: BlockModelBarrelType.Top,
        expected: 'assets/reinfbarrel/models/block/copper_barrel.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel top open',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: BlockModelBarrelType.TopOpen,
        expected: 'assets/reinfstorage/models/block/diamond_barrel_open.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new BarrelBlockModelGenerator(project, material)

      const actual = generator.path(type)
      expect(actual).toBe(expected)
    })
  })

  describe('async zip()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: BlockModelBarrelType
      expected: {
        path: string
        data: BlockModel
      }
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel top',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        type: BlockModelBarrelType.Top,
        expected: {
          path: 'assets/reinfbarrel/models/block/copper_barrel.json',
          data: CopperBarrelBlockModel,
        },
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel top open',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        type: BlockModelBarrelType.TopOpen,
        expected: {
          path: 'assets/reinfbarrel/models/block/diamond_barrel_open.json',
          data: DiamondBarrelOpenBlockModel,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, material, type, expected }) => {
      const generator = new BarrelBlockModelGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip, type)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case', async () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }
      const material = MaterialCopperTexture
      const type = BlockModelBarrelType.Top
      const generator = new BarrelBlockModelGenerator(project, material)

      const zip = await generator.zip(new JSZip(), type)
      const expected = new Error(`file already exists: ${generator.path(type)}`)
      expect(async () => await generator.zip(zip, type)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip, type)).rejects.toThrow(expected)
    })
  })
})
