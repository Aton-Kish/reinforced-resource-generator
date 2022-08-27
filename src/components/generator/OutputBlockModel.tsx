import { useState } from 'react'

import OutputBlockModelBarrel from './OutputBlockModelBarrel'
import OutputBlockModelChest from './OutputBlockModelChest'
import OutputBlockModelShulker from './OutputBlockModelShulker '

import type { MaterialTextureOption } from '@/contexts'
import type { ProjectType } from '@/lib/common'
import type { BlockModelGenerator } from '@/lib/model/block'

interface Props {
  generators?: Record<ProjectType, BlockModelGenerator>
  material: MaterialTextureOption
}

const OutputBlockModel = ({ generators, material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Block Model
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputBlockModelChest generator={generators?.chest} material={material} />
        <OutputBlockModelShulker generator={generators?.shulker} material={material} />
        <OutputBlockModelBarrel generator={generators?.barrel} material={material} />
      </div>
    </div>
  )
}

export default OutputBlockModel
