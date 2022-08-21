import { useContext } from 'react'

import { outputContexts, OutputSection } from '../../contexts/output'

import OutputBlockModelBarrel from './OutputBlockModelBarrel'
import OutputBlockModelChest from './OutputBlockModelChest'
import OutputBlockModelShulker from './OutputBlockModelShulker '

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockModel = ({ material }: Props): JSX.Element => {
  const { active, setActive } = useContext(outputContexts[material.id])

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3
        className='cursor-pointer text-lg hover:text-blue-500'
        onClick={() => {
          if (active !== OutputSection.BlockModel) {
            setActive(OutputSection.BlockModel)
          } else {
            setActive()
          }
        }}
      >
        Block Model
      </h3>
      <div className={`flex flex-col gap-1 ${active === OutputSection.BlockModel ? 'h-full' : 'h-0'}`}>
        <OutputBlockModelChest material={material} />
        <OutputBlockModelShulker material={material} />
        <OutputBlockModelBarrel material={material} />
      </div>
    </div>
  )
}

export default OutputBlockModel
