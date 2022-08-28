import { useState } from 'react'
import { v4 as uuid } from 'uuid'

import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from '@/assets/material'
import Generator from '@/components/generator/Generator'
import { MaterialContext, ProjectContext } from '@/contexts'
import { ProjectType } from '@/lib/common'

import Materials from './components/materials/Materials'

import type { MaterialTextureOption } from '@/contexts'
import type { ProjectConfig } from '@/lib/common'

const App = (): JSX.Element => {
  const [project, setProject] = useState<Record<ProjectType, ProjectConfig>>({
    [ProjectType.Chest]: { namespace: 'reinfchest' },
    [ProjectType.Shulker]: { namespace: 'reinfshulker' },
    [ProjectType.Barrel]: { namespace: 'reinfbarrel' },
  })

  const copper: MaterialTextureOption = { ...MaterialCopperTexture, id: uuid(), selected: false }
  const iron: MaterialTextureOption = { ...MaterialIronTexture, id: uuid(), selected: false }
  const gold: MaterialTextureOption = { ...MaterialGoldTexture, id: uuid(), selected: false }
  const diamond: MaterialTextureOption = { ...MaterialDiamondTexture, id: uuid(), selected: false }
  const netherite: MaterialTextureOption = { ...MaterialNetheriteTexture, id: uuid(), selected: false }

  const [materials, setMaterials] = useState<Record<string, MaterialTextureOption>>({
    [copper.id]: copper,
    [iron.id]: iron,
    [gold.id]: gold,
    [diamond.id]: diamond,
    [netherite.id]: netherite,
  })

  return (
    <div className='container mx-auto p-4'>
      <ProjectContext.Provider value={{ project, setProject }}>
        <MaterialContext.Provider value={{ materials, setMaterials }}>
          <div className='flex flex-col gap-4'>
            <Materials />
            <Generator />
          </div>
        </MaterialContext.Provider>
      </ProjectContext.Provider>
    </div>
  )
}

export default App
