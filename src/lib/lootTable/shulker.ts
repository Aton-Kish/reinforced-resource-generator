import JSZip from 'jszip'
import { merge } from 'lodash'

import { ShulkerType } from '@/lib/common'

import type { LootTable } from './common'
import type { Generator, ProjectConfig, ZipOptions } from '@/lib/common'
import type { MaterialTexture } from '@/lib/texture'

export class ShulkerLootTableGenerator implements Generator<LootTable> {
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
    return `data/${this.#project.namespace}/loot_tables/blocks/${type === ShulkerType.Default ? '' : `${type}_`}${
      this.#material.name
    }_shulker_box.json`
  }

  async zip(zip: JSZip, type: ShulkerType, options?: ZipOptions): Promise<JSZip> {
    let lootTable: LootTable
    const path = this.path(type)
    if (path in zip.files) {
      if (!(options?.extend ?? false)) {
        throw new Error(`file already exists: ${path}`)
      }

      lootTable = merge(JSON.parse(await zip.file(path)!.async('string')) as LootTable, this.generate(type))
    } else {
      lootTable = this.generate(type)
    }

    const data = JSON.stringify(lootTable, null, 2)
    zip.file(path, data)

    return zip
  }
}
