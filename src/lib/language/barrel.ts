import capitalize from 'capitalize'

import { LanguageGenerator } from './common'

import type { Language } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class BarrelLanguageGenerator extends LanguageGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

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
}
