import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { ItemModel } from '@/lib/model/item'

const OutputItemModelBarrel = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [model, setModel] = useState<ItemModel>({})

  useEffect(() => {
    if (generators.itemModel?.barrel == null) {
      return
    }

    const generator = generators.itemModel?.barrel
    setModel(generator.generate())
  }, [generators.itemModel?.barrel])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code lang={generators.itemModel?.barrel?.path()} data={JSON.stringify(model, null, 2)} />
    </div>
  )
}

export default OutputItemModelBarrel
