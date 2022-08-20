import Input from './Input'
import Output from './Output'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const GeneratorCard = ({ material }: Props): JSX.Element => {
  return (
    <div className='grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-[256px_1fr]'>
      <Input material={material} />
      <Output material={material} />
    </div>
  )
}

export default GeneratorCard
