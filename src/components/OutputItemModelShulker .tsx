import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { ShulkerType } from '@/lib/common'

import Code from './Code'

import type { ItemModel } from '@/lib/model/item'

const OutputItemModelShulker = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [models, setModels] = useState<Partial<Record<ShulkerType, ItemModel>>>({})

  useEffect(() => {
    if (generators.itemModel?.shulker == null) {
      return
    }

    const generator = generators.itemModel?.shulker
    const models = Object.values(ShulkerType).reduce<Partial<Record<ShulkerType, ItemModel>>>((acc, type) => {
      return { ...acc, [type]: generator.generate(type) }
    }, {})
    setModels(models)
  }, [generators.itemModel?.shulker])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(models).map(([type, model]) => {
          return (
            <Code
              key={type}
              lang={generators.itemModel?.shulker?.path(type as ShulkerType)}
              data={JSON.stringify(model, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputItemModelShulker
