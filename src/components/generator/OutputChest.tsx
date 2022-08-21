import OutputChestBlockStates from './OutputChestBlockStates'
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
      <OutputChestBlockStates material={material} />
    </div>
  )
}

export default OutputChest
