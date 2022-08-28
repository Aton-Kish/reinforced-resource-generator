import { useState } from 'react'

import Input from './Input'
import Output from './Output'

import type { MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const GeneratorCard = ({ material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`overflow-hidden rounded-lg border ${isOpen ? 'border-blue-500' : ''}`}>
      <div className='flex cursor-pointer items-center gap-2 p-4 hover:bg-blue-50' onClick={() => setIsOpen(!isOpen)}>
        <img className='w-8' src={material.src} alt={material.name} title={material.name} />
        <h2 className='text-2xl'>{`${material.namespace}:${material.name}`}</h2>
      </div>
      <div className={isOpen ? 'h-full' : 'h-0'}>
        <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-[360px_1fr]'>
          <Input material={material} />
          <Output material={material} />
        </div>
      </div>
    </div>
  )
}

export default GeneratorCard
