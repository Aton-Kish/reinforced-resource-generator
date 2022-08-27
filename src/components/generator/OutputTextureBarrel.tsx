import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { BarrelType } from '@/lib/common'

import type { MaterialTextureOption } from '@/contexts'
import type { TextureGenerator } from '@/lib/texture'

interface Props {
  generator?: TextureGenerator
  material: MaterialTextureOption
}

const OutputTextureBarrel = ({ generator, material }: Props): JSX.Element => {
  const [textures, setTextures] = useState<Partial<Record<BarrelType, string>>>({})

  useEffect(() => {
    if (generator == null) {
      return
    }

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
  }, [generator])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Texture</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(textures).map(([type, src]) => {
          const id = `block/${material.name}_barrel_${type}`

          return <img key={`${type}-barrel-${material.id}`} className='w-8' src={src} alt={id} title={id} />
        })}
      </div>
    </div>
  )
}

export default OutputTextureBarrel
