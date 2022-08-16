import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import {
  ShulkerBlackTexture,
  ShulkerBlueTexture,
  ShulkerBrownTexture,
  ShulkerCyanTexture,
  ShulkerDefaultTexture,
  ShulkerGrayTexture,
  ShulkerGreenTexture,
  ShulkerLightBlueTexture,
  ShulkerLightGrayTexture,
  ShulkerLimeTexture,
  ShulkerMagentaTexture,
  ShulkerOrangeTexture,
  ShulkerPinkTexture,
  ShulkerPurpleTexture,
  ShulkerRedTexture,
  ShulkerWhiteTexture,
  ShulkerYellowTexture,
} from '../assets/shulker'
import { ShulkerGenerator, ShulkerType } from '../lib/shulker'

import type { MaterialTexture } from '../assets/material'
import type { BaseTextures } from '../lib/shulker'
import type { FC } from 'react'

type Images = {
  [type in ShulkerType]?: string
}

export interface ShulkerProps {
  material: MaterialTexture
}

const Shulker: FC<ShulkerProps> = ({ material }) => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: BaseTextures = {
        [ShulkerType.Default]: await Jimp.read(ShulkerDefaultTexture),
        [ShulkerType.White]: await Jimp.read(ShulkerWhiteTexture),
        [ShulkerType.Orange]: await Jimp.read(ShulkerOrangeTexture),
        [ShulkerType.Magenta]: await Jimp.read(ShulkerMagentaTexture),
        [ShulkerType.LightBlue]: await Jimp.read(ShulkerLightBlueTexture),
        [ShulkerType.Yellow]: await Jimp.read(ShulkerYellowTexture),
        [ShulkerType.Lime]: await Jimp.read(ShulkerLimeTexture),
        [ShulkerType.Pink]: await Jimp.read(ShulkerPinkTexture),
        [ShulkerType.Gray]: await Jimp.read(ShulkerGrayTexture),
        [ShulkerType.LightGray]: await Jimp.read(ShulkerLightGrayTexture),
        [ShulkerType.Cyan]: await Jimp.read(ShulkerCyanTexture),
        [ShulkerType.Purple]: await Jimp.read(ShulkerPurpleTexture),
        [ShulkerType.Blue]: await Jimp.read(ShulkerBlueTexture),
        [ShulkerType.Brown]: await Jimp.read(ShulkerBrownTexture),
        [ShulkerType.Green]: await Jimp.read(ShulkerGreenTexture),
        [ShulkerType.Red]: await Jimp.read(ShulkerRedTexture),
        [ShulkerType.Black]: await Jimp.read(ShulkerBlackTexture),
      }
      const matl = await Jimp.read(material.src)

      const shulker = new ShulkerGenerator(base, matl)
      const images: Images = {}
      for (const type of Object.values(ShulkerType)) {
        images[type] = await shulker.generate(type).getBase64Async(Jimp.MIME_PNG)
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

export default Shulker
