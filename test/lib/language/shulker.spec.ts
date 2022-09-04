import JSZip from 'jszip'
import merge from 'ts-deepmerge'

import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from '@/assets/material'
import { ShulkerLanguageGenerator } from '@/lib/language'

import CopperShulkerBoxLanguage from './data/reinfshulker/copper_en_us.json'
import DiamondShulkerBoxLanguage from './data/reinfshulker/diamond_en_us.json'
import ShulkerBoxLanguage from './data/reinfshulker/en_us.json'

import type { Constructable } from '#/types'
import type { ProjectConfig } from '@/lib/common'
import type { Language } from '@/lib/language'
import type { MaterialTexture } from '@/lib/texture'

describe('ShulkerLanguageGenerator', () => {
  describe('generate()', () => {
    const positiveCases: {
      name: string
      project: ProjectConfig
      material: MaterialTexture
      expected: Language
    }[] = [
      {
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        expected: CopperShulkerBoxLanguage,
      },
      {
        name: 'positive case: reinfshulker:diamond_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialDiamondTexture,
        expected: DiamondShulkerBoxLanguage,
      },
    ]

    it('positive case: reinfshulker', () => {
      const project: ProjectConfig = { namespace: 'reinfshulker' }

      const copperGenerator = new ShulkerLanguageGenerator(project, MaterialCopperTexture)
      const ironGenerator = new ShulkerLanguageGenerator(project, MaterialIronTexture)
      const goldGenerator = new ShulkerLanguageGenerator(project, MaterialGoldTexture)
      const diamondGenerator = new ShulkerLanguageGenerator(project, MaterialDiamondTexture)
      const netheriteGenerator = new ShulkerLanguageGenerator(project, MaterialNetheriteTexture)

      const actual = merge(
        copperGenerator.generate(),
        ironGenerator.generate(),
        goldGenerator.generate(),
        diamondGenerator.generate(),
        netheriteGenerator.generate(),
      )
      const expected: Language = ShulkerBoxLanguage
      expect(actual).toStrictEqual(expected)
    })

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ShulkerLanguageGenerator(project, material)

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
        name: 'positive case: reinfshulker:copper_shulker_box',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        expected: 'assets/reinfshulker/lang/en_us.json',
      },
      {
        name: 'positive case: reinfstorage:diamond_shulker_box',
        project: { namespace: 'reinfstorage' },
        material: MaterialDiamondTexture,
        expected: 'assets/reinfstorage/lang/en_us.json',
      },
    ]

    it.each(positiveCases)('$name', ({ project, material, expected }) => {
      const generator = new ShulkerLanguageGenerator(project, material)

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
        name: 'positive case: reinfshulker:copper_chest',
        project: { namespace: 'reinfshulker' },
        material: MaterialCopperTexture,
        expected: {
          path: 'assets/reinfshulker/lang/en_us.json',
          data: CopperShulkerBoxLanguage,
        },
      },
      {
        name: 'positive case: reinfshulker:diamond_chest',
        project: { namespace: 'reinfshulker' },
        material: MaterialDiamondTexture,
        expected: {
          path: 'assets/reinfshulker/lang/en_us.json',
          data: DiamondShulkerBoxLanguage,
        },
      },
    ]

    it('positive case: reinfshulker', async () => {
      const project: ProjectConfig = { namespace: 'reinfshulker' }

      const copperGenerator = new ShulkerLanguageGenerator(project, MaterialCopperTexture)
      const ironGenerator = new ShulkerLanguageGenerator(project, MaterialIronTexture)
      const goldGenerator = new ShulkerLanguageGenerator(project, MaterialGoldTexture)
      const diamondGenerator = new ShulkerLanguageGenerator(project, MaterialDiamondTexture)
      const netheriteGenerator = new ShulkerLanguageGenerator(project, MaterialNetheriteTexture)

      let zip = new JSZip()
      zip = await copperGenerator.zip(zip)
      zip = await ironGenerator.zip(zip)
      zip = await goldGenerator.zip(zip)
      zip = await diamondGenerator.zip(zip)
      zip = await netheriteGenerator.zip(zip)

      const actual = zip
      const expected: { data: Language; path: string } = {
        path: 'assets/reinfshulker/lang/en_us.json',
        data: ShulkerBoxLanguage,
      }
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it.each(positiveCases)('$name', async ({ project, material, expected }) => {
      const generator = new ShulkerLanguageGenerator(project, material)

      const zip = new JSZip()

      const actual = await generator.zip(zip)
      expect(Object.keys(actual.files)).toContain(expected.path)
      expect(JSON.parse(await actual.file(expected.path)!.async('string'))).toStrictEqual(expected.data)
    })

    it('negative case: already exists', async () => {
      const project: ProjectConfig = { namespace: 'reinfshulker' }
      const material: MaterialTexture = MaterialCopperTexture
      const generator = new ShulkerLanguageGenerator(project, material)

      const zip = await generator.zip(new JSZip(), { extend: false })
      const expected = new Error(`file already exists: ${generator.path()}`)
      expect(async () => await generator.zip(zip, { extend: false })).rejects.toThrow(
        expected.constructor as Constructable<Error>,
      )
      expect(async () => await generator.zip(zip, { extend: false })).rejects.toThrow(expected)
    })
  })
})
