import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { ChestBlockStateGenerator } from '@/lib/blockState'

import CopperChestBlockState from './data/reinfchest/copper_chest.json'
import DiamondChestBlockState from './data/reinfchest/diamond_chest.json'

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
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestBlockState,
      },
      {
        name: 'positive case: reinfchest',
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
        name: 'positive case: reinfchest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: 'assets/reinfchest/blockstates/copper_chest.json',
      },
      {
        name: 'positive case: reinfstorage',
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
})
