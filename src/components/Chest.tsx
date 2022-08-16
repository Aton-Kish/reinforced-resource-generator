import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { ChestLeftTexture, ChestRightTexture, ChestSingleTexture } from '../assets/chest'
import { ChestGenerator, ChestType } from '../lib/chest'

import type { MaterialTexture } from '../assets/material'
import type { BaseTextures } from '../lib/chest'
import type { FC } from 'react'

type Images = {
  [type in ChestType]?: string
}

export interface ChestProps {
  material: MaterialTexture
}

const Chest: FC<ChestProps> = ({ material }) => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: BaseTextures = {
        [ChestType.Single]: await Jimp.read(ChestSingleTexture),
        [ChestType.Left]: await Jimp.read(ChestLeftTexture),
        [ChestType.Right]: await Jimp.read(ChestRightTexture),
      }
      const matl = await Jimp.read(material.src)

      const chest = new ChestGenerator(base, matl)
      const images: Images = {}
      for (const type of Object.values(ChestType)) {
        images[type] = await chest.generate(type).getBase64Async(Jimp.MIME_PNG)
      }
      setImages({ ...images })
    }

    generate()
  }, [material])

  return (
    <div className='flex flex-wrap gap-2'>
      {Object.entries(images).map(([type, src]) => (
        <img key={type} className='w-32' src={src} alt={type} title={type} />
      ))}
    </div>
  )
}

export default Chest
