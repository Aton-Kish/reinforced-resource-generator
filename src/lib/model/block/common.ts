import { BarrelType } from '@/lib/common'

export const BlockModelBarrelType = {
  Top: BarrelType.Top,
  TopOpen: BarrelType.TopOpen,
} as const

export type BlockModelBarrelType = typeof BlockModelBarrelType[keyof typeof BlockModelBarrelType]

export interface BlockModel {
  parent?: string
  textures?: Record<string, string>
}
