import JSZip from 'jszip'
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

import type { Constructable } from '#/types'
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

  describe('async zip()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: {
        path: string
        data: Language
      }
    }[] = [
      {
        name: 'positive case: reinfchest:copper_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialCopperTexture,
        expected: {
          path: 'assets/reinfchest/lang/en_us.json',
          data: CopperChestLanguage,
        },
      },
      {
        name: 'positive case: reinfchest:diamond_chest',
        project: { namespace: 'reinfchest' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'assets/reinfchest/lang/en_us.json',
          data: DiamondChestLanguage,
        },
      },
    ]

    it('positive case: reinfchest', async () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }

      const copperGenerator = new ChestLanguageGenerator(project, MaterialCopperTexture)
      const ironGenerator = new ChestLanguageGenerator(project, MaterialIronTexture)
      const goldGenerator = new ChestLanguageGenerator(project, MaterialGoldTexture)
      const diamondGenerator = new ChestLanguageGenerator(project, MaterialDiamondTexture)
      const netheriteGenerator = new ChestLanguageGenerator(project, MaterialNetheriteTexture)

      let zip = new JSZip()
      zip = await copperGenerator.zip(zip)
      zip = await ironGenerator.zip(zip)
      zip = await goldGenerator.zip(zip)
      zip = await diamondGenerator.zip(zip)
      zip = await netheriteGenerator.zip(zip)

      const actual = zip
      const expected: { data: Language; path: string } = {
        path: 'assets/reinfchest/lang/en_us.json',
        data: ChestLanguage,
      }
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new ChestLanguageGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case: already exists', async () => {
      const project: ProjectConfig = { namespace: 'reinfchest' }
      const material: MaterialTexture = MaterialCopperTexture
      const generator = new ChestLanguageGenerator(project, material)

      const zip = await generator.zip(new JSZip(), { extend: false })
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip, { extend: false })).rejects.toThrow(
        expected.constructor as Constructable<Error>,
      )
      expect(async () => await generator.zip(zip, { extend: false })).rejects.toThrow(expected)
    })
  })
})
