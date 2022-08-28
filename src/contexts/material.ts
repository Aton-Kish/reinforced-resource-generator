import { createContext } from 'react'

import type { MaterialTexture } from '@/lib/texture'

export interface MaterialTextureOption extends MaterialTexture {
  id: string
  selected: boolean
}

export interface MaterialContextValue {
  materials: Record<string, MaterialTextureOption>
  setMaterials: (materials: Record<string, MaterialTextureOption>) => void
}

export const MaterialContext = createContext<MaterialContextValue>({
  materials: {},
  setMaterials: () => {},
})
