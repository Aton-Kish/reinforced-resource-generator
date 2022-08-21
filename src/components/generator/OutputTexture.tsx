import { useState } from 'react'

import OutputTextureBarrel from './OutputTextureBarrel'
import OutputTextureChest from './OutputTextureChest'
import OutputTextureShulker from './OutputTextureShulker'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputTexture = ({ material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Texture
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputTextureChest material={material} />
        <OutputTextureShulker material={material} />
        <OutputTextureBarrel material={material} />
      </div>
    </div>
  )
}

export default OutputTexture
