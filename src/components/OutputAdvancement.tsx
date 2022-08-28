import { useState } from 'react'

import OutputAdvancementBarrel from './OutputAdvancementBarrel'
import OutputAdvancementChest from './OutputAdvancementChest'
import OutputAdvancementShulker from './OutputAdvancementShulker'

const OutputAdvancement = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <div>
        <div
          className='inline-flex cursor-pointer items-center text-lg hover:text-blue-500'
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 48 48'>
            <path d={isOpen ? 'M44 10H4l20 20Z' : 'M10 44V4l20 20Z'} />
          </svg>
          <h3>Advancement</h3>
        </div>
      </div>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputAdvancementChest />
        <OutputAdvancementShulker />
        <OutputAdvancementBarrel />
      </div>
    </div>
  )
}

export default OutputAdvancement
