import OutputBlockStateBarrel from './OutputBlockStateBarrel'
import OutputBlockStateChest from './OutputBlockStateChest'
import OutputBlockStateShulker from './OutputBlockStateShulker'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockState = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Block State</h3>
      <OutputBlockStateChest material={material} />
      <OutputBlockStateShulker material={material} />
      <OutputBlockStateBarrel material={material} />
    </div>
  )
}

export default OutputBlockState
