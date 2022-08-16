import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from '../assets/material'

import Input from './Input'
import Output from './Output'

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
        const id = `${material.namespace}:${material.name}`

        return (
          <div key={id} className='grid grid-cols-2 gap-2'>
            <Input material={material} />
            <Output material={material} />
          </div>
        )
      })}
    </div>
  )
}

export default Generator
