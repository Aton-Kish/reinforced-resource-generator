import type { BarrelType, ShulkerType } from '@/lib/common'
import type JSZip from 'jszip'

export interface BlockModelGenerator {
  generate(type?: ShulkerType | BarrelType): BlockModel
  zipSync(zip: JSZip, type?: ShulkerType | BarrelType): JSZip
}

export interface BlockModel {
  parent?: string
  textures?: Record<string, string>
}
