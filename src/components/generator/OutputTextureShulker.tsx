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
} from '@/assets/shulker'
import { ShulkerType } from '@/lib/common'
import { ShulkerTextureGenerator } from '@/lib/texture'

import type { MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const OutputTextureShulker = ({ material }: Props): JSX.Element => {
  const [textures, setTextures] = useState<Partial<Record<ShulkerType, string>>>({})

  useEffect(() => {
    const generate = async () => {
      const base: Record<ShulkerType, Jimp> = {
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

      const generator = new ShulkerTextureGenerator(base, matl)
      const textures = await Object.values(ShulkerType).reduce<Promise<Partial<Record<ShulkerType, string>>>>(
        async (acc, type) => {
          const jimp = generator.generate(type)
          const src = await jimp.getBase64Async(Jimp.MIME_PNG)
          return Promise.resolve({ ...(await acc), [type]: src })
        },
        Promise.resolve({}),
      )
      setTextures({ ...textures })
    }

    generate()
  }, [material.src])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(textures).map(([type, src]) => {
          const id = `entity/reinforced_shulker/${material.name}/shulker${
            type === ShulkerType.Default ? '' : `_${type}`
          }`

          return <img key={`${type}-shulker-${material.id}`} className='w-32' src={src} alt={id} title={id} />
        })}
      </div>
    </div>
  )
}

export default OutputTextureShulker
