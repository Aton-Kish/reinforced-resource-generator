import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockStateGenerator } from '@/lib/blockState'
import type { BlockState } from '@/lib/blockState'

interface Props {
  generator?: BlockStateGenerator
  material: MaterialTextureOption
}

const OutputBlockStateBarrel = ({ generator, material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [blockState, setBlockState] = useState<BlockState>({ variants: {} })

  useEffect(() => {
    if (generator == null) {
      return
    }

    setBlockState(generator.generate())
  }, [generator])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code
        lang={`${project.barrel.namespace}/assets/blockstates/${material.name}_barrel.json`}
        data={JSON.stringify(blockState, null, 2)}
      />
    </div>
  )
}

export default OutputBlockStateBarrel
