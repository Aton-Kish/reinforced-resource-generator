import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import CopperTexture from '../assets/material/copper.png'

import type { FC } from 'react'

const Canvas: FC = () => {
  const [image, setImage] = useState<string>()

  useEffect(() => {
    const load = async () => {
      const jimpImage = await Jimp.read(CopperTexture)
      const image = await jimpImage.clone().resize(128, 128).getBase64Async(Jimp.MIME_PNG)
      setImage(image)
    }

    load()
  }, [])

  return (
    <>
      <img src={image} />
    </>
  )
}

export default Canvas
