import OutputBlockModelBarrel from './OutputBlockModelBarrel'
import OutputBlockModelChest from './OutputBlockModelChest'
import OutputBlockModelShulker from './OutputBlockModelShulker '

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockModel = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Block Model</h3>
      <OutputBlockModelChest material={material} />
      <OutputBlockModelShulker material={material} />
      <OutputBlockModelBarrel material={material} />
    </div>
  )
}

export default OutputBlockModel
