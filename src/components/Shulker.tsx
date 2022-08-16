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
import { DyeColor, ShulkerGenerator } from '../lib/shulker'

import type { MaterialTexture } from '../assets/material'
import type { BaseTextures } from '../lib/shulker'
import type { FC } from 'react'

type Images = {
  [color in DyeColor]?: string
}

export interface ShulkerProps {
  material: MaterialTexture
}

const Shulker: FC<ShulkerProps> = ({ material }) => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: BaseTextures = {
        [DyeColor.Default]: await Jimp.read(ShulkerDefaultTexture),
        [DyeColor.White]: await Jimp.read(ShulkerWhiteTexture),
        [DyeColor.Orange]: await Jimp.read(ShulkerOrangeTexture),
        [DyeColor.Magenta]: await Jimp.read(ShulkerMagentaTexture),
        [DyeColor.LightBlue]: await Jimp.read(ShulkerLightBlueTexture),
        [DyeColor.Yellow]: await Jimp.read(ShulkerYellowTexture),
        [DyeColor.Lime]: await Jimp.read(ShulkerLimeTexture),
        [DyeColor.Pink]: await Jimp.read(ShulkerPinkTexture),
        [DyeColor.Gray]: await Jimp.read(ShulkerGrayTexture),
        [DyeColor.LightGray]: await Jimp.read(ShulkerLightGrayTexture),
        [DyeColor.Cyan]: await Jimp.read(ShulkerCyanTexture),
        [DyeColor.Purple]: await Jimp.read(ShulkerPurpleTexture),
        [DyeColor.Blue]: await Jimp.read(ShulkerBlueTexture),
        [DyeColor.Brown]: await Jimp.read(ShulkerBrownTexture),
        [DyeColor.Green]: await Jimp.read(ShulkerGreenTexture),
        [DyeColor.Red]: await Jimp.read(ShulkerRedTexture),
        [DyeColor.Black]: await Jimp.read(ShulkerBlackTexture),
      }
      const matl = await Jimp.read(material.src)

      const shulker = new ShulkerGenerator(base, matl)
      const images: Images = {}
      for (const color of Object.values(DyeColor)) {
        images[color] = await shulker.generate(color).getBase64Async(Jimp.MIME_PNG)
      }
      setImages({ ...images })
    }

    generate()
  }, [material])

  return (
    <div>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(images).map(([color, src]) => (
          <img key={color} className='w-32' src={src} alt={color} title={color} />
        ))}
      </div>
    </div>
  )
}

export default Shulker
