import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { BarrelBottomTexture, BarrelSideTexture, BarrelTopOpenTexture, BarrelTopTexture } from '../assets/barrel'
import { BarrelGenerator, BarrelType } from '../lib/barrel'

import type { MaterialTexture } from '../assets/material'
import type { BaseTextures } from '../lib/barrel'
import type { FC } from 'react'

type Images = {
  [type in BarrelType]?: string
}

export interface BarrelProps {
  material: MaterialTexture
}

const Barrel: FC<BarrelProps> = ({ material }) => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: BaseTextures = {
        [BarrelType.Top]: await Jimp.read(BarrelTopTexture),
        [BarrelType.TopOpen]: await Jimp.read(BarrelTopOpenTexture),
        [BarrelType.Side]: await Jimp.read(BarrelSideTexture),
        [BarrelType.Bottom]: await Jimp.read(BarrelBottomTexture),
      }
      const matl = await Jimp.read(material.src)

      const barrel = new BarrelGenerator(base, matl)
      const images: Images = {}
      for (const type of Object.values(BarrelType)) {
        images[type] = await barrel.generate(type).getBase64Async(Jimp.MIME_PNG)
      }
      setImages({ ...images })
    }

    generate()
  }, [material])

  return (
    <div>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(images).map(([type, src]) => (
          <img key={type} className='w-8' src={src} alt={type} title={type} />
        ))}
      </div>
    </div>
  )
}

export default Barrel
