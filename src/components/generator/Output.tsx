import OutputBarrel from './OutputBarrel'
import OutputChest from './OutputChest'
import OutputShulker from './OutputShulker'

import type { SelectableMaterialTexture } from '../../contexts'

export interface OutputProps {
  material: SelectableMaterialTexture
}

const Output = ({ material }: OutputProps): JSX.Element => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl'>Output</h2>
      <OutputChest material={material} />
      <OutputShulker material={material} />
      <OutputBarrel material={material} />
    </div>
  )
}

export default Output
