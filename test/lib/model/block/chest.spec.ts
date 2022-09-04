import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { ChestBlockModelGenerator } from '@/lib/model/block'

import CopperChestBlockModel from './data/reinfchest/copper_chest.json'
import DiamondChestBlockModel from './data/reinfchest/diamond_chest.json'

import type { Constructable } from '#/types'
import type { ProjectConfig } from '@/lib/common'
import type { BlockModel } from '@/lib/model/block'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestBlockModelGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: BlockModel
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestBlockModel,
      },
      {
        name: 'positive case: reinfchest:diamond_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: DiamondChestBlockModel,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestBlockModelGenerator(project, material)

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
        expected: 'assets/reinfchest/models/block/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_chest',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/models/block/diamond_chest.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestBlockModelGenerator(project, material)

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
        data: BlockModel
      }
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: {
          path: 'assets/reinfchest/models/block/copper_chest.json',
          data: CopperChestBlockModel,
        },
      },
      {
        name: 'positive case: reinfchest:diamond_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'assets/reinfchest/models/block/diamond_chest.json',
          data: DiamondChestBlockModel,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new ChestBlockModelGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case: already exists', async () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }
      const material = MaterialCopperTexture
      const generator = new ChestBlockModelGenerator(project, material)

      const zip = await generator.zip(new JSZip())
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected)
    })
  })
})
