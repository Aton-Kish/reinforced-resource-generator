import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '../../contexts'
import { BarrelType } from '../../lib/common'
import { BarrelGenerator } from '../../lib/model/block'

import Code from './Code'

import type { SelectableMaterialTexture } from '../../contexts'
import type { BlockModel } from '../../lib/model/block'

interface Props {
  material: SelectableMaterialTexture
}

const OutputBarrelBlockModel = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [models, setModels] = useState<Partial<Record<BarrelType, BlockModel>>>({})

  useEffect(() => {
    const generator = new BarrelGenerator(project.namespace.barrel, material.name)
    const models: Partial<Record<BarrelType, BlockModel>> = {
      [BarrelType.Top]: generator.generate(BarrelType.Top),
      [BarrelType.TopOpen]: generator.generate(BarrelType.TopOpen),
    }
    setModels(models)
  }, [project, material])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Block Model</h4>
      <Code
        lang={`${project.namespace.barrel}/assets/models/block/${material.name}_barrel.json`}
        data={JSON.stringify(models[BarrelType.Top], null, 2)}
      />
      <Code
        lang={`${project.namespace.barrel}/assets/models/block/${material.name}_barrel_open.json`}
        data={JSON.stringify(models[BarrelType.TopOpen], null, 2)}
      />
    </div>
  )
}

export default OutputBarrelBlockModel
