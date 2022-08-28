import { useState } from 'react'

import OutputBlockStateBarrel from './OutputBlockStateBarrel'
import OutputBlockStateChest from './OutputBlockStateChest'
import OutputBlockStateShulker from './OutputBlockStateShulker'

const OutputBlockState = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <div className='inline-flex cursor-pointer items-center text-lg hover:text-blue-500'>
        <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 48 48'>
          <path d={isOpen ? 'M44 10H4l20 20Z' : 'M10 44V4l20 20Z'} />
        </svg>
        <h3 onClick={() => setIsOpen(!isOpen)}>Block State</h3>
      </div>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputBlockStateChest />
        <OutputBlockStateShulker />
        <OutputBlockStateBarrel />
      </div>
    </div>
  )
}

export default OutputBlockState
