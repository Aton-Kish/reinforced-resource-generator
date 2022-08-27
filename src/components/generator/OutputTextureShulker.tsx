import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { ShulkerType } from '@/lib/common'

import type { MaterialTextureOption } from '@/contexts'
import type { TextureGenerator } from '@/lib/texture'

interface Props {
  generator?: TextureGenerator
  material: MaterialTextureOption
}

const OutputTextureShulker = ({ generator, material }: Props): JSX.Element => {
  const [textures, setTextures] = useState<Partial<Record<ShulkerType, string>>>({})

  useEffect(() => {
    if (generator == null) {
      return
    }

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
  }, [generator])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(textures).map(([type, src]) => {
          const id = `entity/reinforced_shulker/${material.name}/shulker${
            type === ShulkerType.Default ? '' : `_${type}`
          }`

          return <img key={`${type}-shulker-${material.id}`} className='w-32' src={src} alt={id} title={id} />
        })}
      </div>
    </div>
  )
}

export default OutputTextureShulker
