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
