import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from './assets/material'
import Configuration from './components/configuration/Configuration'
import Generator from './components/generator/Generator'
import { MaterialContext } from './contexts'

import type { SelectableMaterialTexture } from './contexts'

const App = (): JSX.Element => {
  const copper: SelectableMaterialTexture = { ...MaterialCopperTexture, id: uuid(), selected: false }
  const iron: SelectableMaterialTexture = { ...MaterialIronTexture, id: uuid(), selected: false }
  const gold: SelectableMaterialTexture = { ...MaterialGoldTexture, id: uuid(), selected: false }
  const diamond: SelectableMaterialTexture = { ...MaterialDiamondTexture, id: uuid(), selected: false }
  const netherite: SelectableMaterialTexture = { ...MaterialNetheriteTexture, id: uuid(), selected: false }

  const [materials, setMaterials] = useState<Record<string, SelectableMaterialTexture>>({
    [copper.id]: copper,
    [iron.id]: iron,
    [gold.id]: gold,
    [diamond.id]: diamond,
    [netherite.id]: netherite,
  })

  return (
    <div className='container mx-auto p-4'>
      <MaterialContext.Provider value={{ materials, setMaterials }}>
        <div className='flex flex-col gap-4'>
          <Configuration />
          <Generator />
        </div>
      </MaterialContext.Provider>
    </div>
  )
}

export default App
