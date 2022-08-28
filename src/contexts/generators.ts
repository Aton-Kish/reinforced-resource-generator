import { createContext } from 'react'

import { BarrelAdvancementGenerator, ChestAdvancementGenerator, ShulkerAdvancementGenerator } from '@/lib/advancement'
import { BarrelBlockStateGenerator, ChestBlockStateGenerator, ShulkerBlockStateGenerator } from '@/lib/blockState'
import { ProjectType } from '@/lib/common'
import { BarrelLanguageGenerator, ChestLanguageGenerator, ShulkerLanguageGenerator } from '@/lib/language'
import { BarrelLootTableGenerator, ChestLootTableGenerator, ShulkerLootTableGenerator } from '@/lib/lootTable'
import { BarrelBlockModelGenerator, ChestBlockModelGenerator, ShulkerBlockModelGenerator } from '@/lib/model/block'
import { BarrelItemModelGenerator, ChestItemModelGenerator, ShulkerItemModelGenerator } from '@/lib/model/item'
import { BarrelRecipeGenerator, ChestRecipeGenerator, ShulkerRecipeGenerator } from '@/lib/recipe'
import { BarrelTextureGenerator, ChestTextureGenerator, ShulkerTextureGenerator } from '@/lib/texture'

export interface Generators {
  texture?: {
    [ProjectType.Chest]?: ChestTextureGenerator
    [ProjectType.Shulker]?: ShulkerTextureGenerator
    [ProjectType.Barrel]?: BarrelTextureGenerator
  }
  language?: {
    [ProjectType.Chest]?: ChestLanguageGenerator
    [ProjectType.Shulker]?: ShulkerLanguageGenerator
    [ProjectType.Barrel]?: BarrelLanguageGenerator
  }
  blockModel?: {
    [ProjectType.Chest]?: ChestBlockModelGenerator
    [ProjectType.Shulker]?: ShulkerBlockModelGenerator
    [ProjectType.Barrel]?: BarrelBlockModelGenerator
  }
  itemModel?: {
    [ProjectType.Chest]?: ChestItemModelGenerator
    [ProjectType.Shulker]?: ShulkerItemModelGenerator
    [ProjectType.Barrel]?: BarrelItemModelGenerator
  }
  blockState?: {
    [ProjectType.Chest]?: ChestBlockStateGenerator
    [ProjectType.Shulker]?: ShulkerBlockStateGenerator
    [ProjectType.Barrel]?: BarrelBlockStateGenerator
  }
  lootTable?: {
    [ProjectType.Chest]?: ChestLootTableGenerator
    [ProjectType.Shulker]?: ShulkerLootTableGenerator
    [ProjectType.Barrel]?: BarrelLootTableGenerator
  }
  recipe?: {
    [ProjectType.Chest]?: ChestRecipeGenerator
    [ProjectType.Shulker]?: ShulkerRecipeGenerator
    [ProjectType.Barrel]?: BarrelRecipeGenerator
  }
  advancement?: {
    [ProjectType.Chest]?: ChestAdvancementGenerator
    [ProjectType.Shulker]?: ShulkerAdvancementGenerator
    [ProjectType.Barrel]?: BarrelAdvancementGenerator
  }
}

export interface GeneratorsContextValue {
  generators: Generators
  setGenerators: (generators: Generators) => void
}

export const GeneratorsContext = createContext<GeneratorsContextValue>({
  generators: {},
  setGenerators: () => {},
})
