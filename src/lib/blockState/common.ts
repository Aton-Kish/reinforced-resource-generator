import type { ShulkerType } from '@/lib/common'
import type JSZip from 'jszip'

export interface BlockStateGenerator {
  generate(type?: ShulkerType): BlockState
  zipSync(zip: JSZip, type?: ShulkerType): JSZip
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
