import Jimp from 'jimp'
import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { ChestType } from '@/lib/common'

const OutputTextureChest = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [textures, setTextures] = useState<Partial<Record<ChestType, string>>>({})

  useEffect(() => {
    if (generators.texture?.chest == null) {
      return
    }

    const generator = generators.texture?.chest

    const load = async () => {
      const textures = await Object.values(ChestType).reduce<Promise<Partial<Record<ChestType, string>>>>(
        async (acc, type) => {
          const jimp = generator.generate(type)
          const src = await jimp.getBase64Async(Jimp.MIME_PNG)
          return Promise.resolve({ ...(await acc), [type]: src })
        },
        Promise.resolve({}),
      )
      setTextures({ ...textures })
    }

    load()
  }, [generators.texture?.chest])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(textures).map(([type, src]) => {
          return (
            <img
              key={type}
              className='w-32'
              src={src}
              alt={generators.texture?.chest?.path(type as ChestType)}
              title={generators.texture?.chest?.path(type as ChestType)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputTextureChest
