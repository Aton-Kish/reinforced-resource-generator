import { useState } from 'react'

import OutputItemModelBarrel from './OutputItemModelBarrel'
import OutputItemModelChest from './OutputItemModelChest'
import OutputItemModelShulker from './OutputItemModelShulker '

import type { MaterialTextureOption } from '@/contexts'
import type { ProjectType } from '@/lib/common'
import type { ItemModelGenerator } from '@/lib/model/item'

interface Props {
  generators?: Record<ProjectType, ItemModelGenerator>
  material: MaterialTextureOption
}

const OutputItemModel = ({ generators, material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Item Model
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputItemModelChest generator={generators?.chest} material={material} />
        <OutputItemModelShulker generator={generators?.shulker} material={material} />
        <OutputItemModelBarrel generator={generators?.barrel} material={material} />
      </div>
    </div>
  )
}

export default OutputItemModel
