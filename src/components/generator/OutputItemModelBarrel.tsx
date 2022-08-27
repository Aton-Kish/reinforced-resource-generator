import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { BarrelItemModelGenerator } from '@/lib/model/item'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { ItemModel } from '@/lib/model/item'

interface Props {
  material: MaterialTextureOption
}

const OutputItemModelBarrel = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [model, setModel] = useState<ItemModel>({})

  useEffect(() => {
    const generator = new BarrelItemModelGenerator(project.barrel.namespace, material.name)
    setModel(generator.generate())
  }, [project.barrel.namespace, material.name])

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
