import merge from 'ts-deepmerge'

import type JSZip from 'jszip'

export abstract class LanguageGenerator {
  abstract generate(): Language

  abstract path(): string

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

export interface ZipOptions {
  extend?: boolean
}

export type Language = Record<string, string>
