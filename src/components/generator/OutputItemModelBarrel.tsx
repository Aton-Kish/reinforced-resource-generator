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

const OutputItemModelBarrel = ({ generator, material }: Props): JSX.Element => {
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
      <h4 className='text'>Barrel</h4>
      <Code
        lang={`${project.barrel.namespace}/assets/models/item/${material.name}_barrel.json`}
        data={JSON.stringify(model, null, 2)}
      />
    </div>
  )
}

export default OutputItemModelBarrel
