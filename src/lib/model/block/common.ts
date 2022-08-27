import type { BarrelType, ShulkerType } from '@/lib/common'

export interface BlockModelGenerator {
  generate(type?: ShulkerType | BarrelType): BlockModel
}

export interface BlockModel {
  parent?: string
  textures?: Record<string, string>
}
