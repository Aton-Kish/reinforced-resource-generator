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
} from '../../assets/shulker'
import { ShulkerType } from '../../lib/common'
import { ShulkerGenerator } from '../../lib/texture'

import type { SelectableMaterialTexture } from '../../contexts'
import type { ShulkerBaseTextures } from '../../lib/texture'

type Images = {
  [type in ShulkerType]?: string
}

interface Props {
  material: SelectableMaterialTexture
}

const OutputShulkerTexture = ({ material }: Props): JSX.Element => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: ShulkerBaseTextures = {
        [ShulkerType.Default]: await Jimp.read(ShulkerDefaultTexture.src),
        [ShulkerType.White]: await Jimp.read(ShulkerWhiteTexture.src),
        [ShulkerType.Orange]: await Jimp.read(ShulkerOrangeTexture.src),
        [ShulkerType.Magenta]: await Jimp.read(ShulkerMagentaTexture.src),
        [ShulkerType.LightBlue]: await Jimp.read(ShulkerLightBlueTexture.src),
        [ShulkerType.Yellow]: await Jimp.read(ShulkerYellowTexture.src),
        [ShulkerType.Lime]: await Jimp.read(ShulkerLimeTexture.src),
        [ShulkerType.Pink]: await Jimp.read(ShulkerPinkTexture.src),
        [ShulkerType.Gray]: await Jimp.read(ShulkerGrayTexture.src),
        [ShulkerType.LightGray]: await Jimp.read(ShulkerLightGrayTexture.src),
        [ShulkerType.Cyan]: await Jimp.read(ShulkerCyanTexture.src),
        [ShulkerType.Purple]: await Jimp.read(ShulkerPurpleTexture.src),
        [ShulkerType.Blue]: await Jimp.read(ShulkerBlueTexture.src),
        [ShulkerType.Brown]: await Jimp.read(ShulkerBrownTexture.src),
        [ShulkerType.Green]: await Jimp.read(ShulkerGreenTexture.src),
        [ShulkerType.Red]: await Jimp.read(ShulkerRedTexture.src),
        [ShulkerType.Black]: await Jimp.read(ShulkerBlackTexture.src),
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
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Texture</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(images).map(([type, src]) => {
          const shulkerType = `shulker${type === ShulkerType.Default ? '' : `_${type}`}`
          const id = `entity/reinforced_shulker/${material.name}/${shulkerType}`

          return <img key={`${type}-shulker-${material.id}`} className='w-32' src={src} alt={id} title={id} />
        })}
      </div>
    </div>
  )
}

export default OutputShulkerTexture
