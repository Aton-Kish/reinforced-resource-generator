import JSZip from 'jszip'
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

import type { Constructable } from '#/types'
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
        name: 'positive case: reinfbarrel:copper_chest',
        project: { namespace: 'reinfbarrel' },
        material: MaterialCopperTexture,
        expected: {
          path: 'assets/reinfbarrel/lang/en_us.json',
          data: CopperBarrelLanguage,
        },
      },
      {
        name: 'positive case: reinfbarrel:diamond_chest',
        project: { namespace: 'reinfbarrel' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'assets/reinfbarrel/lang/en_us.json',
          data: DiamondBarrelLanguage,
        },
      },
    ]

    it('positive case: reinfbarrel', async () => {
      const project: ProjectConfig = { namespace: 'reinfbarrel' }

      const copperGenerator = new BarrelLanguageGenerator(project, MaterialCopperTexture)
      const ironGenerator = new BarrelLanguageGenerator(project, MaterialIronTexture)
      const goldGenerator = new BarrelLanguageGenerator(project, MaterialGoldTexture)
      const diamondGenerator = new BarrelLanguageGenerator(project, MaterialDiamondTexture)
      const netheriteGenerator = new BarrelLanguageGenerator(project, MaterialNetheriteTexture)

      let zip = new JSZip()
      zip = await copperGenerator.zip(zip)
      zip = await ironGenerator.zip(zip)
      zip = await goldGenerator.zip(zip)
      zip = await diamondGenerator.zip(zip)
      zip = await netheriteGenerator.zip(zip)

      const actual = zip
      const expected: { data: Language; path: string } = {
        path: 'assets/reinfbarrel/lang/en_us.json',
        data: BarrelLanguage,
      }
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new BarrelLanguageGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case', async () => {
      const project: ProjectConfig = { namespace: 'reinfbarrel' }
      const material: MaterialTexture = MaterialCopperTexture
      const generator = new BarrelLanguageGenerator(project, material)

      const zip = await generator.zip(new JSZip(), { extend: false })
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip, { extend: false })).rejects.toThrow(
        expected.constructor as Constructable<Error>,
      )
      expect(async () => await generator.zip(zip, { extend: false })).rejects.toThrow(expected)
    })
  })
})
