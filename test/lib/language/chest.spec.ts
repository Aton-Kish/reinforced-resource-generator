import merge from 'ts-deepmerge'

import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from '@/assets/material'
import { ChestLanguageGenerator } from '@/lib/language'

import CopperChestLanguage from './data/reinfchest/copper_en_us.json'
import DiamondChestLanguage from './data/reinfchest/diamond_en_us.json'
import ChestLanguage from './data/reinfchest/en_us.json'

import type { ProjectConfig } from '@/lib/common'
import type { Language } from '@/lib/language'
import type { MaterialTexture } from '@/lib/texture'

describe('ChestLanguageGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: Language
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: CopperChestLanguage,
      },
      {
        name: 'positive case: reinfchest:diamond_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: DiamondChestLanguage,
      },
    ]

    it('positive case: reinfchest', () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }

      const copperGenerator = new ChestLanguageGenerator(project, MaterialCopperTexture)
      const ironGenerator = new ChestLanguageGenerator(project, MaterialIronTexture)
      const goldGenerator = new ChestLanguageGenerator(project, MaterialGoldTexture)
      const diamondGenerator = new ChestLanguageGenerator(project, MaterialDiamondTexture)
      const netheriteGenerator = new ChestLanguageGenerator(project, MaterialNetheriteTexture)

      const actual = merge(
        copperGenerator.generate(),
        ironGenerator.generate(),
        goldGenerator.generate(),
        diamondGenerator.generate(),
        netheriteGenerator.generate(),
      )
      const expected: Language = ChestLanguage
      expect(actual).toStrictEqual(expected)
    })

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestLanguageGenerator(project, material)

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
        expected: 'assets/reinfchest/lang/en_us.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_chest',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/lang/en_us.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ChestLanguageGenerator(project, material)

      const actual = generator.path()
      expect(actual).toBe(expected)
    })
  })
})
