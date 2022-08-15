import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { BarrelBottomTexture, BarrelSideTexture, BarrelTopOpenTexture, BarrelTopTexture } from '../assets/barrel'
import { BarrelGenerator, BarrelType } from '../lib/barrel'

import type { BaseTextures } from '../lib/barrel'
import type { FC } from 'react'

type Images = {
  [type in BarrelType]?: string
}

export interface BarrelProps {
  material: string
}

const Barrel: FC<BarrelProps> = (props) => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: BaseTextures = {
        [BarrelType.Top]: await Jimp.read(BarrelTopTexture),
        [BarrelType.TopOpen]: await Jimp.read(BarrelTopOpenTexture),
        [BarrelType.Side]: await Jimp.read(BarrelSideTexture),
        [BarrelType.Bottom]: await Jimp.read(BarrelBottomTexture),
      }
      const material = await Jimp.read(props.material)

      const chest = new BarrelGenerator(base, material)
      const images: Images = {
        [BarrelType.Top]: await chest.generate(BarrelType.Top).getBase64Async(Jimp.MIME_PNG),
        [BarrelType.TopOpen]: await chest.generate(BarrelType.TopOpen).getBase64Async(Jimp.MIME_PNG),
        [BarrelType.Side]: await chest.generate(BarrelType.Side).getBase64Async(Jimp.MIME_PNG),
        [BarrelType.Bottom]: await chest.generate(BarrelType.Bottom).getBase64Async(Jimp.MIME_PNG),
      }
      setImages((prev) => ({ ...prev, ...images }))
    }

    generate()
  }, [props])

  return (
    <>
      <img src={images[BarrelType.Top]} />
      <img src={images[BarrelType.TopOpen]} />
      <img src={images[BarrelType.Side]} />
      <img src={images[BarrelType.Bottom]} />
    </>
  )
}

export default Barrel
