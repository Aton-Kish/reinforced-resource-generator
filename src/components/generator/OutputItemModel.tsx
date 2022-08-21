import OutputItemModelBarrel from './OutputItemModelBarrel'
import OutputItemModelChest from './OutputItemModelChest'
import OutputItemModelShulker from './OutputItemModelShulker '

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputItemModel = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Item Model</h3>
      <OutputItemModelChest material={material} />
      <OutputItemModelShulker material={material} />
      <OutputItemModelBarrel material={material} />
    </div>
  )
}

export default OutputItemModel
