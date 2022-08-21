import { useState } from 'react'

import Input from './Input'
import Output from './Output'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const GeneratorCard = ({ material }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={`rounded-lg border ${isOpen ? 'border-blue-500' : ''}`}>
        <div
          className={`flex cursor-pointer items-center gap-2 p-4 hover:bg-blue-50 ${
            isOpen ? 'rounded-t-lg' : 'rounded-lg'
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img className='w-8' src={material.src} alt={material.name} title={material.name} />
          <h2 className='text-2xl'>{`${material.namespace}:${material.name}`}</h2>
        </div>
        <div className={`overflow-hidden ${isOpen ? 'h-full' : 'h-0'}`}>
          <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-[256px_1fr]'>
            <Input material={material} />
            <Output material={material} />
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneratorCard
