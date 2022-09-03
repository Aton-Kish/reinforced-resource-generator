import merge from 'ts-deepmerge'

import { ShulkerType } from '../common'

import type JSZip from 'jszip'

export abstract class LootTableGenerator {
  abstract generate(type?: ShulkerType): LootTable

  abstract path(type?: ShulkerType): string

  async zip(zip: JSZip, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, type: ShulkerType, options?: ZipOptions): Promise<JSZip>
  async zip(zip: JSZip, arg1?: ShulkerType | ZipOptions, arg2?: ZipOptions): Promise<JSZip> {
    const isShulkerType = (arg?: ShulkerType | ZipOptions): arg is ShulkerType => typeof arg === 'string'

    let type: ShulkerType | undefined
    let options: ZipOptions | undefined
    if (isShulkerType(arg1)) {
      type = arg1
    } else {
      options = arg1
    }
    options = options ?? arg2

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

export interface ZipOptions {
  extend?: boolean
}

export interface LootTable {
  type: string
  pools: LootTablePool[]
}

export interface LootTablePool {
  rolls: number
  bonus_rolls: number
  entries: LootTablePoolEntry[]
  conditions?: LootTablePoolCondition[]
}

export interface LootTablePoolEntry {
  type: string
  functions: LootTablePoolEntryFunction[]
  name: string
}

export interface LootTablePoolEntryFunction {
  function: string
  source?: string
  type?: string
  ops?: LootTablePoolEntryFunctionOperation[]
  entries?: LootTablePoolEntryFunctionEntry[]
}

export interface LootTablePoolEntryFunctionOperation {
  source: string
  target: string
  op: string
}

export interface LootTablePoolEntryFunctionEntry {
  type: string
  name: string
}

export interface LootTablePoolCondition {
  condition: string
}
