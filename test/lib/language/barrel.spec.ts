import merge from 'ts-deepmerge'

import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from '@/assets/material'
import { BarrelLanguageGenerator } from '@/lib/language'

import CopperBarrelLanguage from './data/reinfbarrel/copper_en_us.json'
import DiamondBarrelLanguage from './data/reinfbarrel/diamond_en_us.json'
import BarrelLanguage from './data/reinfbarrel/en_us.json'

import type { ProjectConfig } from '@/lib/common'
import type { Language } from '@/lib/language'
import type { MaterialTexture } from '@/lib/texture'

describe('BarrelLanguageGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: Language
    }[] = [
      {
        name: 'positive case: reinfbarrel:copper_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: CopperBarrelLanguage,
      },
      {
        name: 'positive case: reinfbarrel:diamond_barrel',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: DiamondBarrelLanguage,
      },
    ]

    it('positive case: reinfbarrel', () => {
      const project: ProjectConfig = { namespace: 'reinfbarrel' }

      const copperGenerator = new BarrelLanguageGenerator(project, MaterialCopperTexture)
      const ironGenerator = new BarrelLanguageGenerator(project, MaterialIronTexture)
      const goldGenerator = new BarrelLanguageGenerator(project, MaterialGoldTexture)
      const diamondGenerator = new BarrelLanguageGenerator(project, MaterialDiamondTexture)
      const netheriteGenerator = new BarrelLanguageGenerator(project, MaterialNetheriteTexture)

      const actual = merge(
        copperGenerator.generate(),
        ironGenerator.generate(),
        goldGenerator.generate(),
        diamondGenerator.generate(),
        netheriteGenerator.generate(),
      )
      const expected: Language = BarrelLanguage
      expect(actual).toStrictEqual(expected)
    })

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelLanguageGenerator(project, material)

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
        expected: 'assets/reinfbarrel/lang/en_us.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_barrel',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/lang/en_us.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new BarrelLanguageGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
