import { useState } from 'react'

import OutputItemModelBarrel from './OutputItemModelBarrel'
import OutputItemModelChest from './OutputItemModelChest'
import OutputItemModelShulker from './OutputItemModelShulker '

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputItemModel = ({ material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Item Model
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputItemModelChest material={material} />
        <OutputItemModelShulker material={material} />
        <OutputItemModelBarrel material={material} />
      </div>
    </div>
  )
}

export default OutputItemModel
