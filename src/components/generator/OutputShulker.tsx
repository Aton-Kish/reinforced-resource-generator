import OutputShulkerBlockModel from './OutputShulkerBlockModel '
import OutputShulkerBlockState from './OutputShulkerBlockState'
import OutputShulkerItemModel from './OutputShulkerItemModel '
import OutputShulkerTexture from './OutputShulkerTexture'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputShulker = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Shulker</h3>
      <OutputShulkerTexture material={material} />
      <OutputShulkerBlockModel material={material} />
      <OutputShulkerItemModel material={material} />
      <OutputShulkerBlockState material={material} />
    </div>
  )
}

export default OutputShulker
