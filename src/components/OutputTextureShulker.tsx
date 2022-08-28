import Jimp from 'jimp'
import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { ShulkerType } from '@/lib/common'

const OutputTextureShulker = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [textures, setTextures] = useState<Partial<Record<ShulkerType, string>>>({})

  useEffect(() => {
    if (generators.texture?.shulker == null) {
      return
    }

    const generator = generators.texture?.shulker

    const load = async () => {
      const textures = await Object.values(ShulkerType).reduce<Promise<Partial<Record<ShulkerType, string>>>>(
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
  }, [generators.texture?.shulker])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(textures).map(([type, src]) => {
          return (
            <img
              key={type}
              className='w-32'
              src={src}
              alt={generators.texture?.shulker?.path(type as ShulkerType)}
              title={generators.texture?.shulker?.path(type as ShulkerType)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputTextureShulker
