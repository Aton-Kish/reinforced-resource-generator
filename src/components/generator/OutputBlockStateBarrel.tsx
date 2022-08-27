import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { BarrelBlockStateGenerator } from '@/lib/blockState'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockState } from '@/lib/blockState'

interface Props {
  material: MaterialTextureOption
}

const OutputBlockStateBarrel = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [blockState, setBlockState] = useState<BlockState>({ variants: {} })

  useEffect(() => {
    const generator = new BarrelBlockStateGenerator(project.barrel.namespace, material.name)
    setBlockState(generator.generate())
  }, [project.barrel.namespace, material.name])

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
