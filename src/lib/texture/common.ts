import type { BarrelType, ChestType, ShulkerType } from '@/lib/common'
import type Jimp from 'jimp'

export interface TextureGenerator {
  generate(type: ChestType | ShulkerType | BarrelType): Jimp
}
