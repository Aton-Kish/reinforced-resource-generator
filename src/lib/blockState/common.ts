import type { ShulkerType } from '@/lib/common'

export interface BlockStateGenerator {
  generate(type?: ShulkerType): BlockState
}

export interface BlockState {
  variants: {
    [key: string]: {
      model: string
      x?: number
      y?: number
    }
  }
}
