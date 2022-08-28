import capitalize from 'capitalize'
import JSZip from 'jszip'

import type { Language, LanguageGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestLanguageGenerator implements LanguageGenerator {
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
    key = `container.${this.#project.namespace}.${this.#material.name}Chest`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Chest`
    lang[key] = value

    key = `container.${this.#project.namespace}.${this.#material.name}ChestDouble`
    value = `Large ${capitalize.words(this.#material.name.split('_').join(' '))} Chest`
    lang[key] = value

    // Block
    key = `block.${this.#project.namespace}.${this.#material.name}_chest`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Chest`
    lang[key] = value

    // Stat
    key = `stat.${this.#project.namespace}.open_${this.#material.name}_chest`
    value = `${capitalize.words(this.#material.name.split('_').join(' '))} Chests Opened`
    lang[key] = value

    return lang
  }

  path(): string {
    return `assets/${this.#project.namespace}/lang/en_us.json`
  }

  zipSync(zip: JSZip): JSZip {
    const lang = this.generate()
    const data = JSON.stringify(lang, null, 2)

    const path = this.path()
    zip.file(path, data)

    return zip
  }
}
