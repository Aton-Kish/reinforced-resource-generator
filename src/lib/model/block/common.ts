import type { BarrelType, ShulkerType } from '@/lib/common'
import type JSZip from 'jszip'

export interface BlockModelGenerator {
  generate(type?: ShulkerType | BarrelType): BlockModel
  path(type?: ShulkerType | BarrelType): string
  zipSync(zip: JSZip, type?: ShulkerType | BarrelType): JSZip
}

export interface BlockModel {
  parent?: string
  textures?: Record<string, string>
}
