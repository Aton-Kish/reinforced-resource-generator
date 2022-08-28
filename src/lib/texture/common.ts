import type { BarrelType, ChestType, ShulkerType } from '@/lib/common'
import type Jimp from 'jimp'
import type JSZip from 'jszip'

export interface TextureGenerator {
  generate(type: ChestType | ShulkerType | BarrelType): Jimp
  path(type: ChestType | ShulkerType | BarrelType): string
  zipAsync(zip: JSZip, type: ChestType | ShulkerType | BarrelType): Promise<JSZip>
}
