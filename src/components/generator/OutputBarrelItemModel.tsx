import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '../../contexts'
import { BarrelGenerator } from '../../lib/model/item'

import Code from './Code'

import type { SelectableMaterialTexture } from '../../contexts'
import type { ItemModel } from '../../lib/model/item'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBarrelItemModel = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [model, setModel] = useState<ItemModel>({})

  useEffect(() => {
    const generator = new BarrelGenerator(project.namespace.barrel, material.name)
    setModel(generator.generate())
  }, [project, material])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Item Model</h4>
      <Code
        lang={`${project.namespace.barrel}/assets/models/item/${material.name}_barrel.json`}
        data={JSON.stringify(model, null, 2)}
      />
    </div>
  )
}

export default OutputBarrelItemModel
