import type { Context } from 'react'

export const OutputSection = {
  Texture: 'Texture',
  BlockModel: 'Block Model',
  ItemModel: 'Item Model',
  BlockState: 'Block State',
} as const

export type OutputSection = typeof OutputSection[keyof typeof OutputSection]

export interface OutputContextValue {
  active?: OutputSection
  setActive: (section?: OutputSection) => void
}

export const outputContexts: Record<string, Context<OutputContextValue>> = {}
