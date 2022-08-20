import Material from './Material'

import type { MaterialTexture } from '../../assets/material'
import type { FC } from 'react'

export interface InputProps {
  material: MaterialTexture
}

const Input: FC<InputProps> = ({ material }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl'>Input</h2>
      <Material material={material} />
    </div>
  )
}

export default Input
