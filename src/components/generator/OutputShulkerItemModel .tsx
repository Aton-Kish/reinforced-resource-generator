import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '../../contexts'
import { ShulkerType } from '../../lib/common'
import { ShulkerGenerator } from '../../lib/models/item'

import Code from './Code'

import type { SelectableMaterialTexture } from '../../contexts'
import type { ItemModel } from '../../lib/models/item'

interface Props {
  material: SelectableMaterialTexture
}

const OutputShulkerItemModel = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [models, setModels] = useState<Partial<Record<ShulkerType, ItemModel>>>({})

  useEffect(() => {
    const generator = new ShulkerGenerator()
    const models = Object.values(ShulkerType).reduce<Partial<Record<ShulkerType, ItemModel>>>((mdls, type) => {
      return { ...mdls, [type]: generator.generate(type) }
    }, {})
    setModels(models)
  }, [])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Item Model</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(models).map(([type, model]) => {
          return (
            <Code
              key={type}
              lang={`${project.namespace.shulker}/assets/models/block/${
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

export default OutputShulkerItemModel
