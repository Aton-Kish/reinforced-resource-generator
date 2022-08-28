import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { ShulkerType } from '@/lib/common'

import Code from './Code'

import type { BlockModel } from '@/lib/model/block'

const OutputBlockModelShulker = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [models, setModels] = useState<Partial<Record<ShulkerType, BlockModel>>>({})

  useEffect(() => {
    if (generators.blockModel?.shulker == null) {
      return
    }

    const generator = generators.blockModel?.shulker
    const models = Object.values(ShulkerType).reduce<Partial<Record<ShulkerType, BlockModel>>>((acc, type) => {
      return { ...acc, [type]: generator.generate(type) }
    }, {})
    setModels(models)
  }, [generators.blockModel?.shulker])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(models).map(([type, model]) => {
          return (
            <Code
              key={type}
              lang={generators.blockModel?.shulker?.path(type as ShulkerType)}
              data={JSON.stringify(model, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputBlockModelShulker
