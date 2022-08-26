import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { ChestGenerator } from '@/lib/blockState'

import Code from './Code'

import type { SelectableMaterialTexture } from '@/contexts'
import type { BlockState } from '@/lib/blockState'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockStateChest = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [blockState, setBlockState] = useState<BlockState>({ variants: {} })

  useEffect(() => {
    const generator = new ChestGenerator(project.namespace.chest, material.name)
    setBlockState(generator.generate())
  }, [project.namespace.chest, material.name])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code
        lang={`${project.namespace.chest}/assets/blockstates/${material.name}_chest.json`}
        data={JSON.stringify(blockState, null, 2)}
      />
    </div>
  )
}

export default OutputBlockStateChest
