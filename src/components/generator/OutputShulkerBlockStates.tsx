import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '../../contexts'
import { BlockStates, ShulkerGenerator } from '../../lib/blockStates'
import { ShulkerType } from '../../lib/common'

import Code from './Code'

import type { SelectableMaterialTexture } from '../../contexts'

interface Props {
  material: SelectableMaterialTexture
}

const OutputShulkerBlockStates = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [blockStates, setBlockStates] = useState<Partial<Record<ShulkerType, BlockStates>>>({})

  useEffect(() => {
    const generator = new ShulkerGenerator(project.namespace.chest, material.name)
    const blockStates = Object.values(ShulkerType).reduce<Partial<Record<ShulkerType, BlockStates>>>((states, type) => {
      return { ...states, [type]: generator.generate(type) }
    }, {})
    setBlockStates(blockStates)
  }, [project, material])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Block States</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(blockStates).map(([type, states]) => {
          return (
            <Code
              key={type}
              lang={`${project.namespace.shulker}/assets/blockstates/${type === ShulkerType.Default ? '' : `${type}_`}${
                material.name
              }_shulker_box.json`}
              data={JSON.stringify(states, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputShulkerBlockStates
