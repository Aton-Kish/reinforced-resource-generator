import capitalize from 'capitalize'

import { ProjectConfig, ShulkerType } from '@/lib/common'

import { LanguageGenerator } from './common'

import type { Language } from './common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerLanguageGenerator extends LanguageGenerator {
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
}
