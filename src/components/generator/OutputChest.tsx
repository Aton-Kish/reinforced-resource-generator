import OutputChestBlockModel from './OutputChestBlockModel'
import OutputChestBlockState from './OutputChestBlockState'
import OutputChestItemModel from './OutputChestItemModel'
import OutputChestTexture from './OutputChestTexture'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputChest = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Chest</h3>
      <OutputChestTexture material={material} />
      <OutputChestBlockModel material={material} />
      <OutputChestItemModel material={material} />
      <OutputChestBlockState material={material} />
    </div>
  )
}

export default OutputChest
