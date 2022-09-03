import { ProjectConfig, ShulkerType } from '@/lib/common'

import { LootTableGenerator } from './common'
import { LootTable } from './common'

import type { MaterialTexture } from '@/lib/texture'

export class ShulkerLootTableGenerator extends LootTableGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
    super()

    this.#project = project
    this.#material = material
  }

  generate(type: ShulkerType): LootTable {
    const table: LootTable = {
      type: 'minecraft:block',
      pools: [
        {
          rolls: 1.0,
          bonus_rolls: 0.0,
          entries: [
            {
              type: 'minecraft:item',
              functions: [
                { function: 'minecraft:copy_name', source: 'block_entity' },
                {
                  function: 'minecraft:copy_nbt',
                  source: 'block_entity',
                  ops: [
                    {
                      source: 'Lock',
                      target: 'BlockEntityTag.Lock',
                      op: 'replace',
                    },
                    {
                      source: 'LootTable',
                      target: 'BlockEntityTag.LootTable',
                      op: 'replace',
                    },
                    {
                      source: 'LootTableSeed',
                      target: 'BlockEntityTag.LootTableSeed',
                      op: 'replace',
                    },
                  ],
                },
                {
                  function: 'minecraft:set_contents',
                  type: 'minecraft:shulker_box',
                  entries: [{ type: 'minecraft:dynamic', name: 'minecraft:contents' }],
                },
              ],
              name: `${this.#project.namespace}:${type === ShulkerType.Default ? '' : `${type}_`}${
                this.#material.name
              }_shulker_box`,
            },
          ],
        },
      ],
    }

    return table
  }

  path(type: ShulkerType): string {
    return `data/${this.#project.namespace}/loot_tables/blocks/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }
}
