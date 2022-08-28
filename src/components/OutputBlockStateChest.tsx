import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { BlockState } from '@/lib/blockState'

const OutputBlockStateChest = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [blockState, setBlockState] = useState<BlockState>({ variants: {} })

  useEffect(() => {
    if (generators.blockState?.chest == null) {
      return
    }

    const generator = generators.blockState?.chest
    setBlockState(generator.generate())
  }, [generators.blockState?.chest])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code lang={generators.blockState?.chest?.path()} data={JSON.stringify(blockState, null, 2)} />
    </div>
  )
}

export default OutputBlockStateChest
