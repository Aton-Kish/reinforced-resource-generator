import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockModelGenerator } from '@/lib/model/block'
import type { BlockModel } from '@/lib/model/block'

interface Props {
  generator?: BlockModelGenerator
  material: MaterialTextureOption
}

const OutputBlockModelChest = ({ generator, material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [model, setModel] = useState<BlockModel>({})

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

export default OutputBlockModelChest
