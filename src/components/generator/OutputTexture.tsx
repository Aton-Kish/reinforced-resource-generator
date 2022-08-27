import { useState } from 'react'

import OutputTextureBarrel from './OutputTextureBarrel'
import OutputTextureChest from './OutputTextureChest'
import OutputTextureShulker from './OutputTextureShulker'

const OutputTexture = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Texture
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputTextureChest />
        <OutputTextureShulker />
        <OutputTextureBarrel />
      </div>
    </div>
  )
}

export default OutputTexture
