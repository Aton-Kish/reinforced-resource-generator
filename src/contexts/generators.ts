import { createContext } from 'react'

import { BarrelBlockStateGenerator, ChestBlockStateGenerator, ShulkerBlockStateGenerator } from '@/lib/blockState'
import { ProjectType } from '@/lib/common'
import { BarrelLanguageGenerator, ChestLanguageGenerator, ShulkerLanguageGenerator } from '@/lib/language'
import { BarrelBlockModelGenerator, ChestBlockModelGenerator, ShulkerBlockModelGenerator } from '@/lib/model/block'
import { BarrelItemModelGenerator, ChestItemModelGenerator, ShulkerItemModelGenerator } from '@/lib/model/item'
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
}

export interface GeneratorsContextValue {
  generators: Generators
  setGenerators: (generators: Generators) => void
}

export const GeneratorsContext = createContext<GeneratorsContextValue>({
  generators: {},
  setGenerators: () => {},
})
