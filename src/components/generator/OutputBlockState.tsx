import { useState } from 'react'

import OutputBlockStateBarrel from './OutputBlockStateBarrel'
import OutputBlockStateChest from './OutputBlockStateChest'
import OutputBlockStateShulker from './OutputBlockStateShulker'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockStateGenerator } from '@/lib/blockState'
import type { ProjectType } from '@/lib/common'

interface Props {
  generators?: Record<ProjectType, BlockStateGenerator>
  material: MaterialTextureOption
}

const OutputBlockState = ({ generators, material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Block State
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputBlockStateChest generator={generators?.chest} material={material} />
        <OutputBlockStateShulker generator={generators?.shulker} material={material} />
        <OutputBlockStateBarrel generator={generators?.barrel} material={material} />
      </div>
    </div>
  )
}

export default OutputBlockState
