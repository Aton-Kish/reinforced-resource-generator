import { ProjectConfig } from '@/lib/common'

import { LootTableGenerator } from './common'

import type { LootTable } from './common'
import type { MaterialTexture } from '@/lib/texture'

export class ChestLootTableGenerator extends LootTableGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

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
}
