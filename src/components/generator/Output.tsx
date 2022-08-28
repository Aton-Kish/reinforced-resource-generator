import { useContext, useEffect, useState } from 'react'

import { Generators, GeneratorsContext, ProjectContext } from '@/contexts'
import { BarrelBlockStateGenerator, ChestBlockStateGenerator, ShulkerBlockStateGenerator } from '@/lib/blockState'
import { BarrelBlockModelGenerator, ChestBlockModelGenerator, ShulkerBlockModelGenerator } from '@/lib/model/block'
import { BarrelItemModelGenerator, ChestItemModelGenerator, ShulkerItemModelGenerator } from '@/lib/model/item'
import { BarrelTextureGenerator, ChestTextureGenerator, ShulkerTextureGenerator } from '@/lib/texture'

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
  const [generators, setGenerators] = useState<Generators>({})

  useEffect(() => {
    const load = async () => {
      const generators: Generators = {
        texture: {
          chest: await ChestTextureGenerator.build(project.chest, material),
          shulker: await ShulkerTextureGenerator.build(project.shulker, material),
          barrel: await BarrelTextureGenerator.build(project.barrel, material),
        },
        blockModel: {
          chest: new ChestBlockModelGenerator(project.chest, material),
          shulker: new ShulkerBlockModelGenerator(project.shulker, material),
          barrel: new BarrelBlockModelGenerator(project.barrel, material),
        },
        itemModel: {
          chest: new ChestItemModelGenerator(project.chest, material),
          shulker: new ShulkerItemModelGenerator(project.shulker, material),
          barrel: new BarrelItemModelGenerator(project.barrel, material),
        },
        blockState: {
          chest: new ChestBlockStateGenerator(project.chest, material),
          shulker: new ShulkerBlockStateGenerator(project.shulker, material),
          barrel: new BarrelBlockStateGenerator(project.barrel, material),
        },
      }
      setGenerators(generators)
    }

    load()
  }, [project, material])

  return (
    <GeneratorsContext.Provider value={{ generators, setGenerators }}>
      <div className='flex flex-col gap-2 overflow-hidden'>
        <h2 className='text-2xl'>Output</h2>
        <OutputTexture />
        <OutputBlockModel />
        <OutputItemModel />
        <OutputBlockState />
      </div>
    </GeneratorsContext.Provider>
  )
}

export default Output
