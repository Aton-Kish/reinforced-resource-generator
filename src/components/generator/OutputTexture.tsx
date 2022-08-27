import { useState } from 'react'

import OutputTextureBarrel from './OutputTextureBarrel'
import OutputTextureChest from './OutputTextureChest'
import OutputTextureShulker from './OutputTextureShulker'

import type { MaterialTextureOption } from '@/contexts'
import type { ProjectType } from '@/lib/common'
import type { TextureGenerator } from '@/lib/texture'

interface Props {
  generators?: Record<ProjectType, TextureGenerator>
  material: MaterialTextureOption
}

const OutputTexture = ({ generators, material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3 className='cursor-pointer text-lg hover:text-blue-500' onClick={() => setIsOpen(!isOpen)}>
        Texture
      </h3>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <OutputTextureChest generator={generators?.chest} material={material} />
        <OutputTextureShulker generator={generators?.shulker} material={material} />
        <OutputTextureBarrel generator={generators?.barrel} material={material} />
      </div>
    </div>
  )
}

export default OutputTexture
