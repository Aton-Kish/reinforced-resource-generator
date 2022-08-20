import { createContext } from 'react'

import type { MaterialTexture } from '../assets/material'

export interface MaterialContextValue {
  materials: Record<string, MaterialTexture>
  setMaterials: (materials: Record<string, MaterialTexture>) => void
}

export const MaterialContext = createContext<MaterialContextValue>({
  materials: {},
  setMaterials: () => {},
})
