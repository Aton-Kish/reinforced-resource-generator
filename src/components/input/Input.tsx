import type { MaterialTexture } from '../../assets/material'
import type { FC } from 'react'

export interface InputProps {
  material: MaterialTexture
}

const Input: FC<InputProps> = ({ material }) => {
  return (
    <div>
      <h2 className='text-2xl'>Input</h2>
      <div>
        <div>namespace: {material.namespace}</div>
        <div>name: {material.name}</div>
        <img className='w-8' src={material.src} alt={material.name} title={material.name} />
      </div>
    </div>
  )
}

export default Input
