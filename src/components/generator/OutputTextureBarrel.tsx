import Jimp from 'jimp'
import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { BarrelType } from '@/lib/common'

const OutputTextureBarrel = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [textures, setTextures] = useState<Partial<Record<BarrelType, string>>>({})

  useEffect(() => {
    if (generators.texture?.barrel == null) {
      return
    }

    const generator = generators.texture?.barrel

    const load = async () => {
      const textures = await Object.values(BarrelType).reduce<Promise<Partial<Record<BarrelType, string>>>>(
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
  }, [generators.texture?.barrel])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Texture</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(textures).map(([type, src]) => {
          return (
            <img
              key={type}
              className='w-8'
              src={src}
              alt={generators.texture?.barrel?.path(type as BarrelType)}
              title={generators.texture?.barrel?.path(type as BarrelType)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputTextureBarrel
