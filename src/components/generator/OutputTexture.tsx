import { useContext } from 'react'

import { outputContexts, OutputSection } from '../../contexts/output'

import OutputTextureBarrel from './OutputTextureBarrel'
import OutputTextureChest from './OutputTextureChest'
import OutputTextureShulker from './OutputTextureShulker'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputTexture = ({ material }: Props): JSX.Element => {
  const { active, setActive } = useContext(outputContexts[material.id])

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3
        className='cursor-pointer text-lg hover:text-blue-500'
        onClick={() => {
          if (active !== OutputSection.Texture) {
            setActive(OutputSection.Texture)
          } else {
            setActive()
          }
        }}
      >
        Texture
      </h3>
      <div className={`flex flex-col gap-1 ${active === OutputSection.Texture ? 'h-full' : 'h-0'}`}>
        <OutputTextureChest material={material} />
        <OutputTextureShulker material={material} />
        <OutputTextureBarrel material={material} />
      </div>
    </div>
  )
}

export default OutputTexture
