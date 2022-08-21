import { useContext } from 'react'

import { outputContexts, OutputSection } from '../../contexts/output'

import OutputBlockStateBarrel from './OutputBlockStateBarrel'
import OutputBlockStateChest from './OutputBlockStateChest'
import OutputBlockStateShulker from './OutputBlockStateShulker'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockState = ({ material }: Props): JSX.Element => {
  const { active, setActive } = useContext(outputContexts[material.id])

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3
        className='cursor-pointer text-lg hover:text-blue-500'
        onClick={() => {
          if (active !== OutputSection.BlockState) {
            setActive(OutputSection.BlockState)
          } else {
            setActive()
          }
        }}
      >
        Block State
      </h3>
      <div className={`flex flex-col gap-1 ${active === OutputSection.BlockState ? 'h-full' : 'h-0'}`}>
        <OutputBlockStateChest material={material} />
        <OutputBlockStateShulker material={material} />
        <OutputBlockStateBarrel material={material} />
      </div>
    </div>
  )
}

export default OutputBlockState
