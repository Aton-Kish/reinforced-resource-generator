import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { BarrelType } from '@/lib/common'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockModelGenerator } from '@/lib/model/block'
import type { BlockModel } from '@/lib/model/block'

interface Props {
  generator?: BlockModelGenerator
  material: MaterialTextureOption
}

const OutputBlockModelBarrel = ({ generator, material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [models, setModels] = useState<Partial<Record<BarrelType, BlockModel>>>({})

  useEffect(() => {
    if (generator == null) {
      return
    }

    const models: Partial<Record<BarrelType, BlockModel>> = {
      [BarrelType.Top]: generator.generate(BarrelType.Top),
      [BarrelType.TopOpen]: generator.generate(BarrelType.TopOpen),
    }
    setModels(models)
  }, [generator])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code
        lang={`${project.barrel.namespace}/assets/models/block/${material.name}_barrel.json`}
        data={JSON.stringify(models[BarrelType.Top], null, 2)}
      />
      <Code
        lang={`${project.barrel.namespace}/assets/models/block/${material.name}_barrel_open.json`}
        data={JSON.stringify(models[BarrelType.TopOpen], null, 2)}
      />
    </div>
  )
}

export default OutputBlockModelBarrel
