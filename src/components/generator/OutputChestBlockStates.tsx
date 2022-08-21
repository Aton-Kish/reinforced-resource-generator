import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '../../contexts'
import { BlockStates, ChestGenerator } from '../../lib/blockStates'

import Code from './Code'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputChestBlockStates = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [blockStates, setBlockStates] = useState<BlockStates>({ variants: {} })

  useEffect(() => {
    const generator = new ChestGenerator(project.namespace.chest, material.name)
    setBlockStates(generator.generate())
  }, [project, material])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Block States</h4>
      <Code
        lang={`${project.namespace.chest}/assets/blockstates/${material.name}_chest.json`}
        data={JSON.stringify(blockStates, null, 2)}
      />
    </div>
  )
}

export default OutputChestBlockStates
