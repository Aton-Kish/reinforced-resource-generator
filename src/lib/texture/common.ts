import type { BarrelType, ChestType, ShulkerType } from '@/lib/common'
import type Jimp from 'jimp'
import type JSZip from 'jszip'

export interface TextureGenerator {
  generate(type: ChestType | ShulkerType | BarrelType): Jimp
  zip(z: JSZip, type: ChestType | ShulkerType | BarrelType): Promise<JSZip>
}
