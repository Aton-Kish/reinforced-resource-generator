import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { ItemModelGenerator } from '@/lib/model/item'
import type { ItemModel } from '@/lib/model/item'

interface Props {
  generator?: ItemModelGenerator
  material: MaterialTextureOption
}

const OutputItemModelChest = ({ generator, material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [model, setModel] = useState<ItemModel>({})

  useEffect(() => {
    if (generator == null) {
      return
    }

    setModel(generator.generate())
  }, [generator])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code
        lang={`${project.chest.namespace}/assets/models/block/${material.name}_chest.json`}
        data={JSON.stringify(model, null, 2)}
      />
    </div>
  )
}

export default OutputItemModelChest
