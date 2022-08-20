import Input from './input/Input'
import Output from './output/Output'

import type { MaterialTexture } from '../assets/material'
import type { FC } from 'react'

export interface GeneratorCardProps {
  material: MaterialTexture
}

const GeneratorCard: FC<GeneratorCardProps> = ({ material }) => {
  return (
    <div className='grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-[256px_1fr]'>
      <Input material={material} />
      <Output material={material} />
    </div>
  )
}

export default GeneratorCard
