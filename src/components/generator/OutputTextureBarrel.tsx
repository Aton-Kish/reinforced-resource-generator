import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { BarrelBottomTexture, BarrelSideTexture, BarrelTopOpenTexture, BarrelTopTexture } from '@/assets/barrel'
import { BarrelType } from '@/lib/common'
import { BarrelTextureGenerator } from '@/lib/texture'

import type { MaterialTextureOption } from '@/contexts'
import type { BarrelTexture } from '@/lib/texture'

interface Props {
  material: MaterialTextureOption
}

const OutputTextureBarrel = ({ material }: Props): JSX.Element => {
  const [textures, setTextures] = useState<Partial<Record<BarrelType, string>>>({})

  useEffect(() => {
    const generate = async () => {
      const base: Record<BarrelType, BarrelTexture> = {
        [BarrelType.Top]: BarrelTopTexture,
        [BarrelType.TopOpen]: BarrelTopOpenTexture,
        [BarrelType.Side]: BarrelSideTexture,
        [BarrelType.Bottom]: BarrelBottomTexture,
      }

      const generator = await BarrelTextureGenerator.build(base, material)
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

    generate()
  }, [material.src])

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
