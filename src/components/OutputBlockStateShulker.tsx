import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { ShulkerType } from '@/lib/common'

import Code from './Code'

import type { BlockState } from '@/lib/blockState'

const OutputBlockStateShulker = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [blockStates, setBlockStates] = useState<Partial<Record<ShulkerType, BlockState>>>({})

  useEffect(() => {
    if (generators.blockState?.shulker == null) {
      return
    }

    const generator = generators.blockState?.shulker
    const blockStates = Object.values(ShulkerType).reduce<Partial<Record<ShulkerType, BlockState>>>((acc, type) => {
      return { ...acc, [type]: generator.generate(type) }
    }, {})
    setBlockStates(blockStates)
  }, [generators.blockState?.shulker])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(blockStates).map(([type, blockState]) => {
          return (
            <Code
              key={type}
              lang={generators.blockState?.shulker?.path(type as ShulkerType)}
              data={JSON.stringify(blockState, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputBlockStateShulker
