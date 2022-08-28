import { useState } from 'react'

import OutputTextureBarrel from './OutputTextureBarrel'
import OutputTextureChest from './OutputTextureChest'
import OutputTextureShulker from './OutputTextureShulker'

const OutputTexture = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <div className='inline-flex cursor-pointer items-center text-lg hover:text-blue-500'>
        <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 48 48'>
          <path d={isOpen ? 'M44 10H4l20 20Z' : 'M10 44V4l20 20Z'} />
        </svg>
        <h3 onClick={() => setIsOpen(!isOpen)}>Texture</h3>
      </div>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputTextureChest />
        <OutputTextureShulker />
        <OutputTextureBarrel />
      </div>
    </div>
  )
}

export default OutputTexture
