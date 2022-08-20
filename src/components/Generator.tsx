import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from '../assets/material'

import Input from './input/Input'
import Output from './output/Output'

import type { MaterialTexture } from '../assets/material'
import type { FC } from 'react'

const Generator: FC = () => {
  const materials: MaterialTexture[] = [
    MaterialCopperTexture,
    MaterialIronTexture,
    MaterialGoldTexture,
    MaterialDiamondTexture,
    MaterialNetheriteTexture,
  ]

  return (
    <div>
      {materials.map((material) => {
        return (
          <div key={material.id} className='grid grid-cols-2 gap-2'>
            <Input material={material} />
            <Output material={material} />
          </div>
        )
      })}
    </div>
  )
}

export default Generator
