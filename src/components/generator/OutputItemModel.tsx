import { useContext } from 'react'

import { outputContexts, OutputSection } from '../../contexts/output'

import OutputItemModelBarrel from './OutputItemModelBarrel'
import OutputItemModelChest from './OutputItemModelChest'
import OutputItemModelShulker from './OutputItemModelShulker '

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputItemModel = ({ material }: Props): JSX.Element => {
  const { active, setActive } = useContext(outputContexts[material.id])

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <h3
        className='cursor-pointer text-lg hover:text-blue-500'
        onClick={() => {
          if (active !== OutputSection.ItemModel) {
            setActive(OutputSection.ItemModel)
          } else {
            setActive()
          }
        }}
      >
        Item Model
      </h3>
      <div className={`flex flex-col gap-1 ${active === OutputSection.ItemModel ? 'h-full' : 'h-0'}`}>
        <OutputItemModelChest material={material} />
        <OutputItemModelShulker material={material} />
        <OutputItemModelBarrel material={material} />
      </div>
    </div>
  )
}

export default OutputItemModel
