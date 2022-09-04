import capitalize from 'capitalize'
import JSZip from 'jszip'
import merge from 'ts-deepmerge'

import { ShulkerType } from '@/lib/common'

import type { Language } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerLanguageGenerator implements Generator<Language> {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): Language {
    let key: string, value: string
    const lang: Language = {}

    // Container
    key = `container.${this.#project.namespace}.${this.#material.name}ShulkerBox`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Shulker Box`
    lang[key] = value

    // Block
    for (const type of Object.values(ShulkerType)) {
      key = `block.${this.#project.namespace}.${type === ShulkerType.Default ? '' : `${type}_`}${
        this.#material.name
      }_shulker_box`
      value = `${
        type === ShulkerType.Default ? '' : `${capitalize.words(type.split('_').join(' '))} `
      }${capitalize.words(this.#material.name.split('_').join(' '))} Shulker Box`
      lang[key] = value
    }

    // Stat
    key = `stat.${this.#project.namespace}.clean_${this.#material.name}_shulker_box`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Shulker Boxes Cleaned`
    lang[key] = value

    key = `stat.${this.#project.namespace}.open_${this.#material.name}_shulker_box`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Shulker Boxes Opened`
    lang[key] = value

    return lang
  }

  path(): string {
    return `assets/${this.#project.namespace}/lang/en_us.json`
  }

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip> {
    let lang: Language
    const path = this.path()
    if (path in zip.files) {
      if (!(options?.extend ?? true)) {
        throw new Error(`file already exists: ${path}`)
      }

      lang = merge(JSON.parse(await zip.file(path)!.async('string')) as Language, this.generate())
    } else {
      lang = this.generate()
    }

    const data = JSON.stringify(lang, null, 2)
    zip.file(path, data)

    return zip
  }
}
