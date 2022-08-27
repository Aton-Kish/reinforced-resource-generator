import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { ChestGenerator } from '@/lib/blockState'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockState } from '@/lib/blockState'

interface Props {
  material: MaterialTextureOption
}

const OutputBlockStateChest = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [blockState, setBlockState] = useState<BlockState>({ variants: {} })

  useEffect(() => {
    const generator = new ChestGenerator(project.chest.namespace, material.name)
    setBlockState(generator.generate())
  }, [project.chest.namespace, material.name])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code
        lang={`${project.chest.namespace}/assets/blockstates/${material.name}_chest.json`}
        data={JSON.stringify(blockState, null, 2)}
      />
    </div>
  )
}

export default OutputBlockStateChest
