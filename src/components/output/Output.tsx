import OutputBarrel from './OutputBarrel'
import OutputChest from './OutputChest'
import OutputShulker from './OutputShulker'

import type { MaterialTexture } from '../../assets/material'
import type { FC } from 'react'

export interface OutputProps {
  material: MaterialTexture
}

const Output: FC<OutputProps> = ({ material }) => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl'>Output</h2>
      <OutputChest material={material} />
      <OutputShulker material={material} />
      <OutputBarrel material={material} />
    </div>
  )
}

export default Output
