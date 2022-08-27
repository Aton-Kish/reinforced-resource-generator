import { useContext, useEffect, useState } from 'react'

import { ProjectContext } from '@/contexts'
import { Generators } from '@/lib'

import OutputBlockModel from './OutputBlockModel'
import OutputBlockState from './OutputBlockState'
import OutputItemModel from './OutputItemModel'
import OutputTexture from './OutputTexture'

import type { MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const Output = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [generators, setGenerators] = useState<Generators>()

  useEffect(() => {
    const load = async () => {
      const generators = await Generators.build(project, material)
      setGenerators(generators)
    }

    load()
  }, [project, material])

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='text-2xl'>Output</h2>
      <OutputTexture generators={generators?.generators?.texture} material={material} />
      <OutputBlockModel generators={generators?.generators?.blockModel} material={material} />
      <OutputItemModel generators={generators?.generators?.itemModel} material={material} />
      <OutputBlockState generators={generators?.generators?.blockState} material={material} />
    </div>
  )
}

export default Output
