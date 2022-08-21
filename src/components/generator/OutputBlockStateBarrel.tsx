import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '../../contexts'
import { BarrelGenerator } from '../../lib/blockState'

import Code from './Code'

import type { SelectableMaterialTexture } from '../../contexts'
import type { BlockState } from '../../lib/blockState'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBlockStateBarrel = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [blockState, setBlockState] = useState<BlockState>({ variants: {} })

  useEffect(() => {
    const generator = new BarrelGenerator(project.namespace.barrel, material.name)
    setBlockState(generator.generate())
  }, [project, material])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code
        lang={`${project.namespace.barrel}/assets/blockstates/${material.name}_barrel.json`}
        data={JSON.stringify(blockState, null, 2)}
      />
    </div>
  )
}

export default OutputBlockStateBarrel
