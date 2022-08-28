import capitalize from 'capitalize'

import type { Language, LanguageGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class BarrelLanguageGenerator implements LanguageGenerator {
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
    key = `container.${this.#project.namespace}.${this.#material.name}Barrel`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Barrel`
    lang[key] = value

    // Block
    key = `block.${this.#project.namespace}.${this.#material.name}_barrel`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Barrel`
    lang[key] = value

    // Stat
    key = `stat.${this.#project.namespace}.open_${this.#material.name}_barrel`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Barrels Opened`
    lang[key] = value

    return lang
  }

  path(): string {
    return `assets/${this.#project.namespace}/lang/en_us.json`
  }

  zipSync(zip: JSZip): JSZip {
    const path = this.path()
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const lang = this.generate()
    const data = JSON.stringify(lang, null, 2)

    zip.file(path, data)

    return zip
  }
}
