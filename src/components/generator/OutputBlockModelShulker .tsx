import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { ShulkerType } from '@/lib/common'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockModelGenerator } from '@/lib/model/block'
import type { BlockModel } from '@/lib/model/block'

interface Props {
  generator?: BlockModelGenerator
  material: MaterialTextureOption
}

const OutputBlockModelShulker = ({ generator, material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [models, setModels] = useState<Partial<Record<ShulkerType, BlockModel>>>({})

  useEffect(() => {
    if (generator == null) {
      return
    }

    const models = Object.values(ShulkerType).reduce<Partial<Record<ShulkerType, BlockModel>>>((acc, type) => {
      return { ...acc, [type]: generator.generate(type) }
    }, {})
    setModels(models)
  }, [generator])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(models).map(([type, model]) => {
          return (
            <Code
              key={type}
              lang={`${project.shulker.namespace}/assets/models/block/${
                type === ShulkerType.Default ? '' : `${type}_`
              }${material.name}_shulker_box.json`}
              data={JSON.stringify(model, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputBlockModelShulker
