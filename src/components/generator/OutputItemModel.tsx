import { useState } from 'react'

import OutputItemModelBarrel from './OutputItemModelBarrel'
import OutputItemModelChest from './OutputItemModelChest'
import OutputItemModelShulker from './OutputItemModelShulker '

const OutputItemModel = (): JSX.Element => {
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
          <h3>Item Model</h3>
        </div>
      </div>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputItemModelChest />
        <OutputItemModelShulker />
        <OutputItemModelBarrel />
      </div>
    </div>
  )
}

export default OutputItemModel
