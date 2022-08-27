import type { ShulkerType } from '@/lib/common'

export interface ItemModelGenerator {
  generate(type?: ShulkerType): ItemModel
}

export interface ItemModel {
  parent?: string
  textures?: Record<string, string>
  display?: Record<string, Record<string, number[]>>
}
