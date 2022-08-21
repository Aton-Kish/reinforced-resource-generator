import { createContext, useEffect, useState } from 'react'

import { outputContexts, OutputSection } from '../../contexts/output'

import OutputBlockModel from './OutputBlockModel'
import OutputBlockState from './OutputBlockState'
import OutputItemModel from './OutputItemModel'
import OutputTexture from './OutputTexture'

import type { SelectableMaterialTexture } from '../../contexts'
import type { OutputContextValue } from '../../contexts/output'

interface Props {
  material: SelectableMaterialTexture
}

const Output = ({ material }: Props): JSX.Element => {
  const OutputContext = createContext<OutputContextValue>({ setActive: () => {} })
  outputContexts[material.id] = OutputContext

  useEffect(() => {
    delete outputContexts[material.id]
  }, [material.id])

  const [active, setActive] = useState<OutputSection | undefined>(OutputSection.Texture)

  return (
    <OutputContext.Provider value={{ active, setActive }}>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl'>Output</h2>
        <OutputTexture material={material} />
        <OutputBlockModel material={material} />
        <OutputItemModel material={material} />
        <OutputBlockState material={material} />
      </div>
    </OutputContext.Provider>
  )
}

export default Output
