import { useState } from 'react'

import OutputBlockModelBarrel from './OutputBlockModelBarrel'
import OutputBlockModelChest from './OutputBlockModelChest'
import OutputBlockModelShulker from './OutputBlockModelShulker '

import type { SelectableMaterialTexture } from '@/contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockModel = ({ material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Block Model
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputBlockModelChest material={material} />
        <OutputBlockModelShulker material={material} />
        <OutputBlockModelBarrel material={material} />
      </div>
    </div>
  )
}

export default OutputBlockModel
