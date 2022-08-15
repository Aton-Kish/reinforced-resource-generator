import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import LeftTexture from '../assets/chest/left.png'
import RightTexture from '../assets/chest/right.png'
import SingleTexture from '../assets/chest/single.png'
import CopperTexture from '../assets/material/copper.png'
// import DiamondTexture from '../assets/material/diamond.png'
// import GoldTexture from '../assets/material/gold.png'
// import IronTexture from '../assets/material/iron.png'
// import NetheriteTexture from '../assets/material/netherite.png'
import { ChestGenerator } from '../lib/chest'

import type { FC } from 'react'

const Canvas: FC = () => {
  const [singleImage, setSingleImage] = useState<string>()
  const [leftImage, setLeftImage] = useState<string>()
  const [rightImage, setRightImage] = useState<string>()

  useEffect(() => {
    const generate = async () => {
      const single = await Jimp.read(SingleTexture)
      const left = await Jimp.read(LeftTexture)
      const right = await Jimp.read(RightTexture)
      const material = await Jimp.read(CopperTexture)

      const chest = new ChestGenerator(single, left, right, material)
      const singleImage = await chest.single().getBase64Async(Jimp.MIME_PNG)
      const leftImage = await chest.left().getBase64Async(Jimp.MIME_PNG)
      const rightImage = await chest.right().getBase64Async(Jimp.MIME_PNG)
      setSingleImage(singleImage)
      setLeftImage(leftImage)
      setRightImage(rightImage)
    }

    generate()
  }, [])

  return (
    <>
      <img src={singleImage} />
      <img src={leftImage} />
      <img src={rightImage} />
    </>
  )
}

export default Canvas
