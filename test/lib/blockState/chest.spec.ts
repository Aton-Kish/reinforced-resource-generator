import JSZip from 'jszip'

import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { ChestBlockStateGenerator } from '@/lib/blockState'

import CopperChestBlockState from './data/reinfchest/copper_chest.json'
import DiamondChestBlockState from './data/reinfchest/diamond_chest.json'

import type { Constructable } from '#/types'
import type { BlockState } from '@/lib/blockState'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestBlockStateGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: BlockState
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestBlockState,
      },
      {
        name: 'positive case: reinfchest:diamond_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: DiamondChestBlockState,
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestBlockStateGenerator(project, material)

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
        expected: 'assets/reinfchest/blockstates/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_chest',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/blockstates/diamond_chest.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestBlockStateGenerator(project, material)

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
        data: BlockState
      }
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: {
          path: 'assets/reinfchest/blockstates/copper_chest.json',
          data: CopperChestBlockState,
        },
      },
      {
        name: 'positive case: reinfchest:diamond_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'assets/reinfchest/blockstates/diamond_chest.json',
          data: DiamondChestBlockState,
        },
      },
    ]

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new ChestBlockStateGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case: already exists', async () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }
      const material = MaterialCopperTexture
      const generator = new ChestBlockStateGenerator(project, material)

      const zip = await generator.zip(new JSZip())
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected.constructor as Constructable<Error>)
      expect(async () => await generator.zip(zip)).rejects.toThrow(expected)
    })
  })
})
