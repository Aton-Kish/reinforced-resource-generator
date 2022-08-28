import type { BlockState, BlockStateGenerator } from './common'
import type { ProjectConfig } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class BarrelBlockStateGenerator implements BlockStateGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): BlockState {
    const state: BlockState = {
      variants: {
        'facing=down,open=false': {
          x: 180,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
        },
        'facing=down,open=true': {
          x: 180,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel_open`,
        },
        'facing=east,open=false': {
          x: 90,
          y: 90,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
        },
        'facing=east,open=true': {
          x: 90,
          y: 90,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel_open`,
        },
        'facing=north,open=false': {
          x: 90,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
        },
        'facing=north,open=true': {
          x: 90,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel_open`,
        },
        'facing=south,open=false': {
          x: 90,
          y: 180,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
        },
        'facing=south,open=true': {
          x: 90,
          y: 180,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel_open`,
        },
        'facing=up,open=false': {
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
        },
        'facing=up,open=true': {
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel_open`,
        },
        'facing=west,open=false': {
          x: 90,
          y: 270,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel`,
        },
        'facing=west,open=true': {
          x: 90,
          y: 270,
          model: `${this.#project.namespace}:block/${this.#material.name}_barrel_open`,
        },
      },
    }

    return state
  }

  path(): string {
    return `assets/${this.#project.namespace}/blockstates/${this.#material.name}_barrel.json`
  }

  zipSync(zip: JSZip): JSZip {
    const path = this.path()
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const state = this.generate()
    const data = JSON.stringify(state, null, 2)

    zip.file(path, data)

    return zip
  }
}
