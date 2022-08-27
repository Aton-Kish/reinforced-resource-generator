import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { ShulkerGenerator } from '@/lib/blockState'
import { ShulkerType } from '@/lib/common'

import Code from './Code'

import type { MaterialTextureOption } from '@/contexts'
import type { BlockState } from '@/lib/blockState'

interface Props {
  material: MaterialTextureOption
}

const OutputBlockStateShulker = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [blockStates, setBlockStates] = useState<Partial<Record<ShulkerType, BlockState>>>({})

  useEffect(() => {
    const generator = new ShulkerGenerator(project.chest.namespace, material.name)
    const blockStates = Object.values(ShulkerType).reduce<Partial<Record<ShulkerType, BlockState>>>((acc, type) => {
      return { ...acc, [type]: generator.generate(type) }
    }, {})
    setBlockStates(blockStates)
  }, [project.chest.namespace, material.name])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(blockStates).map(([type, blockState]) => {
          return (
            <Code
              key={type}
              lang={`${project.shulker.namespace}/assets/blockstates/${type === ShulkerType.Default ? '' : `${type}_`}${
                material.name
              }_shulker_box.json`}
              data={JSON.stringify(blockState, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputBlockStateShulker
