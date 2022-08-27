import type { ShulkerType } from '@/lib/common'
import type JSZip from 'jszip'

export interface ItemModelGenerator {
  generate(type?: ShulkerType): ItemModel
  path(type?: ShulkerType): string
  zipSync(zip: JSZip, type?: ShulkerType): JSZip
}

export interface ItemModel {
  parent?: string
  textures?: Record<string, string>
  display?: Record<string, Record<string, number[]>>
}
