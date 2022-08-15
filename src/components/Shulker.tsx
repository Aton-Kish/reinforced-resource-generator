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

import type { BaseTextures } from '../lib/shulker'
import type { FC } from 'react'

type Images = {
  [color in DyeColor]?: string
}

export interface ShulkerProps {
  material: string
}

const Shulker: FC<ShulkerProps> = (props) => {
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
      const material = await Jimp.read(props.material)

      const shulker = new ShulkerGenerator(base, material)
      const images: Images = {
        [DyeColor.Default]: await shulker.generate(DyeColor.Default).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.White]: await shulker.generate(DyeColor.White).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Orange]: await shulker.generate(DyeColor.Orange).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Magenta]: await shulker.generate(DyeColor.Magenta).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.LightBlue]: await shulker.generate(DyeColor.LightBlue).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Yellow]: await shulker.generate(DyeColor.Yellow).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Lime]: await shulker.generate(DyeColor.Lime).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Pink]: await shulker.generate(DyeColor.Pink).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Gray]: await shulker.generate(DyeColor.Gray).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.LightGray]: await shulker.generate(DyeColor.LightGray).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Cyan]: await shulker.generate(DyeColor.Cyan).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Purple]: await shulker.generate(DyeColor.Purple).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Blue]: await shulker.generate(DyeColor.Blue).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Brown]: await shulker.generate(DyeColor.Brown).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Green]: await shulker.generate(DyeColor.Green).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Red]: await shulker.generate(DyeColor.Red).getBase64Async(Jimp.MIME_PNG),
        [DyeColor.Black]: await shulker.generate(DyeColor.Black).getBase64Async(Jimp.MIME_PNG),
      }
      setImages((prev) => ({ ...prev, ...images }))
    }

    generate()
  }, [props])

  return (
    <>
      <img src={images[DyeColor.Default]} />
      <img src={images[DyeColor.White]} />
      <img src={images[DyeColor.Orange]} />
      <img src={images[DyeColor.Magenta]} />
      <img src={images[DyeColor.LightBlue]} />
      <img src={images[DyeColor.Yellow]} />
      <img src={images[DyeColor.Lime]} />
      <img src={images[DyeColor.Pink]} />
      <img src={images[DyeColor.Gray]} />
      <img src={images[DyeColor.LightGray]} />
      <img src={images[DyeColor.Cyan]} />
      <img src={images[DyeColor.Purple]} />
      <img src={images[DyeColor.Blue]} />
      <img src={images[DyeColor.Brown]} />
      <img src={images[DyeColor.Green]} />
      <img src={images[DyeColor.Red]} />
      <img src={images[DyeColor.Black]} />
    </>
  )
}

export default Shulker
