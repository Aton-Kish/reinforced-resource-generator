import OutputTextureBarrel from './OutputTextureBarrel'
import OutputTextureChest from './OutputTextureChest'
import OutputTextureShulker from './OutputTextureShulker'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputTexture = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Texture</h3>
      <OutputTextureChest material={material} />
      <OutputTextureShulker material={material} />
      <OutputTextureBarrel material={material} />
    </div>
  )
}

export default OutputTexture
