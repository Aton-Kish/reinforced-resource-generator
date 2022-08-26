import OutputBlockModel from './OutputBlockModel'
import OutputBlockState from './OutputBlockState'
import OutputItemModel from './OutputItemModel'
import OutputTexture from './OutputTexture'

import type { SelectableMaterialTexture } from '@/contexts'

interface Props {
  material: SelectableMaterialTexture
}

const Output = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl'>Output</h2>
      <OutputTexture material={material} />
      <OutputBlockModel material={material} />
      <OutputItemModel material={material} />
      <OutputBlockState material={material} />
    </div>
  )
}

export default Output
