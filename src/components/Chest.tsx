import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { ChestLeftTexture, ChestRightTexture, ChestSingleTexture } from '../assets/chest'
import { ChestGenerator, ChestType } from '../lib/chest'

import type { BaseTextures } from '../lib/chest'
import type { FC } from 'react'

type Images = {
  [type in ChestType]?: string
}

export interface ChestProps {
  material: string
}

const Chest: FC<ChestProps> = (props) => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: BaseTextures = {
        [ChestType.Single]: await Jimp.read(ChestSingleTexture),
        [ChestType.Left]: await Jimp.read(ChestLeftTexture),
        [ChestType.Right]: await Jimp.read(ChestRightTexture),
      }
      const material = await Jimp.read(props.material)

      const chest = new ChestGenerator(base, material)
      const images: Images = {
        [ChestType.Single]: await chest.generate(ChestType.Single).getBase64Async(Jimp.MIME_PNG),
        [ChestType.Left]: await chest.generate(ChestType.Left).getBase64Async(Jimp.MIME_PNG),
        [ChestType.Right]: await chest.generate(ChestType.Right).getBase64Async(Jimp.MIME_PNG),
      }
      setImages((prev) => ({ ...prev, ...images }))
    }

    generate()
  }, [props])

  return (
    <>
      <img src={images[ChestType.Single]} />
      <img src={images[ChestType.Left]} />
      <img src={images[ChestType.Right]} />
    </>
  )
}

export default Chest
