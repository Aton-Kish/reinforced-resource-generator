import { MaterialCopperTexture, MaterialDiamondTexture } from '@/assets/material'
import { BarrelType } from '@/lib/common'
import { BarrelBlockModelGenerator } from '@/lib/model/block'

import type { Constructable } from '#/types'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelBlockModelGenerator', () => {
  describe('path()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: BarrelType
      expected: string
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel top',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        type: BarrelType.Top,
        expected: 'assets/reinfbarrel/models/block/copper_barrel.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel top open',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: BarrelType.TopOpen,
        expected: 'assets/reinfstorage/models/block/diamond_barrel_open.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, type, expected }) => {
      const generator = new BarrelBlockModelGenerator(project, material)

      const actual = generator.path(type)
      expect(actual).toBe(expected)
    })

    const negativeCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      type: BarrelType
      expected: Error
    }[] = [
      {
        name: 'negative case: reinfbarrel:copper_barrel side',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        type: BarrelType.Side,
        expected: new Error('invalid barrel type'),
      },
      {
        name: 'negative case: reinfstorage:diamond_barrel bottom',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        type: BarrelType.Bottom,
        expected: new Error('invalid barrel type'),
      },
    ]

    it.each(negativeCases)('$name', ({ project, material, type, expected }) => {
      const generator = new BarrelBlockModelGenerator(project, material)

      expect(() => generator.path(type)).toThrow(expected.constructor as Constructable<Error>)
      expect(() => generator.path(type)).toThrow(expected)
    })
  })
})
