import { ProjectConfig } from '@/lib/common'

import type { LootTable, LootTableGenerator } from './common'
import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class ChestLootTableGenerator implements LootTableGenerator {
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
    return `data/loot_tables/blocks/${this.#material.name}_chest.json`
  }

  zipSync(zip: JSZip): JSZip {
    const path = this.path()
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const table = this.generate()
    const data = JSON.stringify(table, null, 2)

    zip.file(path, data)

    return zip
  }
}
