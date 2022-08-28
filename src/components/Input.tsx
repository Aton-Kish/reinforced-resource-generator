import InputMaterial from './InputMaterial'
import InputProject from './InputProject'

import type { MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const Input = ({ material }: Props): JSX.Element => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl'>Input</h2>
      <InputProject material={material} />
      <InputMaterial material={material} />
    </div>
  )
}

export default Input
