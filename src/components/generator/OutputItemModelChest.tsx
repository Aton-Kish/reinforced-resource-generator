import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { ChestGenerator } from '@/lib/model/item'

import Code from './Code'

import type { SelectableMaterialTexture } from '@/contexts'
import type { ItemModel } from '@/lib/model/item'

interface Props {
  material: SelectableMaterialTexture
}

const OutputItemModelChest = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [model, setModel] = useState<ItemModel>({})

  useEffect(() => {
    const generator = new ChestGenerator(material.namespace, material.name)
    setModel(generator.generate())
  }, [material.namespace, material.name])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code
        lang={`${project.namespace.chest}/assets/models/block/${material.name}_chest.json`}
        data={JSON.stringify(model, null, 2)}
      />
    </div>
  )
}

export default OutputItemModelChest
