import JSZip from 'jszip'

import { ShulkerType } from '@/lib/common'

import type { BlockModel, BlockModelGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerBlockModelGenerator implements BlockModelGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(type: ShulkerType): BlockModel {
    const model: BlockModel = {
      textures: {
        particle: `minecraft:block/${type === ShulkerType.Default ? '' : `${type}_`}shulker_box`,
      },
    }

    return model
  }

  path(type: ShulkerType): string {
    return `assets/${this.#project.namespace}/models/block/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }

  zipSync(zip: JSZip, type: ShulkerType): JSZip {
    const model = this.generate(type)
    const data = JSON.stringify(model, null, 2)

    const path = this.path(type)
    zip.file(path, data)

    return zip
  }
}
