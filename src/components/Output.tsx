import Barrel from './Barrel'
import Chest from './Chest'
import Shulker from './Shulker'

import type { MaterialTexture } from '../assets/material'
import type { FC } from 'react'

export interface OutputProps {
  material: MaterialTexture
}

const Output: FC<OutputProps> = ({ material }) => {
  return (
    <div>
      <h2 className='text-2xl'>Output</h2>
      <div>
        <Chest material={material} />
        <Shulker material={material} />
        <Barrel material={material} />
      </div>
    </div>
  )
}

export default Output
