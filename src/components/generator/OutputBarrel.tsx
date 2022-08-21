import OutputBarrelBlockModel from './OutputBarrelBlockModel'
import OutputBarrelBlockStates from './OutputBarrelBlockStates'
import OutputBarrelItemModel from './OutputBarrelItemModel'
import OutputBarrelTexture from './OutputBarrelTexture'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBarrel = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Barrel</h3>
      <OutputBarrelTexture material={material} />
      <OutputBarrelBlockModel material={material} />
      <OutputBarrelItemModel material={material} />
      <OutputBarrelBlockStates material={material} />
    </div>
  )
}

export default OutputBarrel
