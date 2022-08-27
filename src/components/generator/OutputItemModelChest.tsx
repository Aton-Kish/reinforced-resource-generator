import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { ItemModel } from '@/lib/model/item'

const OutputItemModelChest = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [model, setModel] = useState<ItemModel>({})

  useEffect(() => {
    if (generators.itemModel?.chest == null) {
      return
    }

    const generator = generators.itemModel?.chest
    setModel(generator.generate())
  }, [generators.itemModel?.chest])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code lang={generators.itemModel?.chest?.path()} data={JSON.stringify(model, null, 2)} />
    </div>
  )
}

export default OutputItemModelChest
