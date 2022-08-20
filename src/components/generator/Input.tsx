import InputMaterial from './InputMaterial'

import type { SelectableMaterialTexture } from '../../contexts'

export interface InputProps {
  material: SelectableMaterialTexture
}

const Input = ({ material }: InputProps): JSX.Element => {
  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl'>Input</h2>
      <InputMaterial material={material} />
    </div>
  )
}

export default Input
