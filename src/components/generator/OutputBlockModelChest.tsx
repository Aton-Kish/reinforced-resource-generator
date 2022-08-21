import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '../../contexts'
import { ChestGenerator } from '../../lib/model/block'

import Code from './Code'

import type { SelectableMaterialTexture } from '../../contexts'
import type { BlockModel } from '../../lib/model/block'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockModelChest = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [model, setModel] = useState<BlockModel>({})

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

export default OutputBlockModelChest
