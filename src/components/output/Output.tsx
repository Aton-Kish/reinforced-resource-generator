import Barrel from './Barrel'
import Chest from './Chest'
import Shulker from './Shulker'

import type { MaterialTexture } from '../../assets/material'
import type { FC } from 'react'

export interface OutputProps {
  material: MaterialTexture
}

const Output: FC<OutputProps> = ({ material }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl'>Output</h2>
      <Chest material={material} />
      <Shulker material={material} />
      <Barrel material={material} />
    </div>
  )
}

export default Output
