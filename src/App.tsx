import { useState } from 'react'

import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from './assets/material'
import Generator from './components/Generator'
import { MaterialContext } from './contexts'

import type { MaterialTexture } from './assets/material'
import type { FC } from 'react'

const App: FC = () => {
  const [materials, setMaterials] = useState<Record<string, MaterialTexture>>({
    [MaterialCopperTexture.id]: MaterialCopperTexture,
    [MaterialIronTexture.id]: MaterialIronTexture,
    [MaterialGoldTexture.id]: MaterialGoldTexture,
    [MaterialDiamondTexture.id]: MaterialDiamondTexture,
    [MaterialNetheriteTexture.id]: MaterialNetheriteTexture,
  })

  return (
    <div className='container mx-auto p-4'>
      <MaterialContext.Provider value={{ materials, setMaterials }}>
        <div className='flex flex-col gap-4'>
          {Object.values(materials).map((material) => {
            return <Generator key={material.id} material={material} />
          })}
        </div>
      </MaterialContext.Provider>
    </div>
  )
}

export default App
