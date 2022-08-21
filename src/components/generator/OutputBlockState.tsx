import { useState } from 'react'

import OutputBlockStateBarrel from './OutputBlockStateBarrel'
import OutputBlockStateChest from './OutputBlockStateChest'
import OutputBlockStateShulker from './OutputBlockStateShulker'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockState = ({ material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Block State
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputBlockStateChest material={material} />
        <OutputBlockStateShulker material={material} />
        <OutputBlockStateBarrel material={material} />
      </div>
    </div>
  )
}

export default OutputBlockState
