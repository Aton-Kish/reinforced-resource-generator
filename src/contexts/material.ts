import { createContext } from 'react'

import type { MaterialTexture } from '../lib/texture'

export interface SelectableMaterialTexture extends MaterialTexture {
  id: string
  selected: boolean
}

export interface MaterialContextValue {
  materials: Record<string, SelectableMaterialTexture>
  setMaterials: (materials: Record<string, SelectableMaterialTexture>) => void
}

export const MaterialContext = createContext<MaterialContextValue>({
  materials: {},
  setMaterials: () => {},
})
