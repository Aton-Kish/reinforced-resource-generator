import { ProjectConfig, ShulkerType } from '@/lib/common'

import { LootTable, LootTableGenerator } from './common'

import type { MaterialTexture } from '@/lib/texture'
import type JSZip from 'jszip'

export class ShulkerLootTableGenerator implements LootTableGenerator {
  #project: ProjectConfig
  #material: MaterialTexture

  constructor(project: ProjectConfig, material: MaterialTexture) {
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
    return `data/loot_tables/blocks/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }

  zipSync(zip: JSZip, type: ShulkerType): JSZip {
    const path = this.path(type)
    if (path in zip.files) {
      throw new Error(`file already exists: ${path}`)
    }

    const table = this.generate(type)
    const data = JSON.stringify(table, null, 2)

    zip.file(path, data)

    return zip
  }
}
