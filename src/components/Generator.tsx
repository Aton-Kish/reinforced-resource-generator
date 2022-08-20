import { useState } from 'react'

import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from '../assets/material'
import { MaterialContext } from '../contexts'

import Input from './input/Input'
import Output from './output/Output'

import type { MaterialTexture } from '../assets/material'
import type { FC } from 'react'

const Generator: FC = () => {
  const [materials, setMaterials] = useState<Record<string, MaterialTexture>>({
    [MaterialCopperTexture.id]: MaterialCopperTexture,
    [MaterialIronTexture.id]: MaterialIronTexture,
    [MaterialGoldTexture.id]: MaterialGoldTexture,
    [MaterialDiamondTexture.id]: MaterialDiamondTexture,
    [MaterialNetheriteTexture.id]: MaterialNetheriteTexture,
  })

  return (
    <MaterialContext.Provider value={{ materials, setMaterials }}>
      <div>
        {Object.values(materials).map((material) => {
          return (
            <div key={material.id} className='grid grid-cols-1 gap-4 md:grid-cols-[256px_1fr]'>
              <Input material={material} />
              <Output material={material} />
            </div>
          )
        })}
      </div>
    </MaterialContext.Provider>
  )
}

export default Generator
