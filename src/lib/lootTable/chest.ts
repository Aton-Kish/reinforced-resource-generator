import JSZip from 'jszip'
import { merge } from 'lodash'

import type { LootTable } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestLootTableGenerator implements Generator<LootTable> {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  generate(): LootTable {
    const table: LootTable = {
      type: 'minecraft:block',
      pools: [
        {
          rolls: 1.0,
          bonus_rolls: 0.0,
          entries: [
            {
              type: 'minecraft:item',
              functions: [{ function: 'minecraft:copy_name', source: 'block_entity' }],
              name: `${this.#project.namespace}:${this.#material.name}_chest`,
            },
          ],
          conditions: [{ condition: 'minecraft:survives_explosion' }],
        },
      ],
    }

    return table
  }

  path(): string {
    return `data/${this.#project.namespace}/loot_tables/blocks/${this.#material.name}_chest.json`
  }

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip> {
    let lootTable: LootTable
    const path = this.path()
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      lootTable = merge(JSON.parse(await zip.file(path)!.async('string')) as LootTable, this.generate())
    } else {
      lootTable = this.generate()
    }

    const data = JSON.stringify(lootTable, null, 2)
    zip.file(path, data)

    return zip
  }
}
