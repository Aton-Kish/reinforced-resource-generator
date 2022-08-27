import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { BlockModel } from '@/lib/model/block'

const OutputBlockModelChest = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [model, setModel] = useState<BlockModel>({})

  useEffect(() => {
    if (generators.blockModel?.chest == null) {
      return
    }

    const generator = generators.blockModel?.chest
    setModel(generator.generate())
  }, [generators.blockModel?.chest])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code lang={generators.blockModel?.chest?.path()} data={JSON.stringify(model, null, 2)} />
    </div>
  )
}

export default OutputBlockModelChest
