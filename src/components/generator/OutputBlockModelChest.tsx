import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { ChestBlockModelGenerator } from '@/lib/model/block'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockModel } from '@/lib/model/block'

interface Props {
  material: MaterialTextureOption
}

const OutputBlockModelChest = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [model, setModel] = useState<BlockModel>({})

  useEffect(() => {
    const generator = new ChestBlockModelGenerator(material.namespace, material.name)
    setModel(generator.generate())
  }, [material.namespace, material.name])

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

export default OutputBlockModelChest
