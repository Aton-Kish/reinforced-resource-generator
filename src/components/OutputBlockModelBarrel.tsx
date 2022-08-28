import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { BarrelType } from '@/lib/common'

import Code from './Code'

import type { BlockModel } from '@/lib/model/block'

const OutputBlockModelBarrel = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [models, setModels] = useState<Partial<Record<BarrelType, BlockModel>>>({})

  useEffect(() => {
    if (generators.blockModel?.barrel == null) {
      return
    }

    const generator = generators.blockModel?.barrel
    const models: Partial<Record<BarrelType, BlockModel>> = {
      [BarrelType.Top]: generator.generate(BarrelType.Top),
      [BarrelType.TopOpen]: generator.generate(BarrelType.TopOpen),
    }
    setModels(models)
  }, [generators.blockModel?.barrel])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code
        lang={generators.blockModel?.barrel?.path(BarrelType.Top)}
        data={JSON.stringify(models[BarrelType.Top], null, 2)}
      />
      <Code
        lang={generators.blockModel?.barrel?.path(BarrelType.TopOpen)}
        data={JSON.stringify(models[BarrelType.TopOpen], null, 2)}
      />
    </div>
  )
}

export default OutputBlockModelBarrel
