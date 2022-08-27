import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { BlockState } from '@/lib/blockState'

const OutputBlockStateBarrel = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [blockState, setBlockState] = useState<BlockState>({ variants: {} })

  useEffect(() => {
    if (generators.blockState?.barrel == null) {
      return
    }

    const generator = generators.blockState?.barrel
    setBlockState(generator.generate())
  }, [generators.blockState?.barrel])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code lang={generators.blockState?.barrel?.path()} data={JSON.stringify(blockState, null, 2)} />
    </div>
  )
}

export default OutputBlockStateBarrel
