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
import type { ShulkerTexture } from '@/lib/texture'

interface Props {
  material: MaterialTextureOption
}

const OutputTextureShulker = ({ material }: Props): JSX.Element => {
  const [textures, setTextures] = useState<Partial<Record<ShulkerType, string>>>({})

  useEffect(() => {
    const generate = async () => {
      const base: Record<ShulkerType, ShulkerTexture> = {
        [ShulkerType.Default]: ShulkerDefaultTexture,
        [ShulkerType.White]: ShulkerWhiteTexture,
        [ShulkerType.Orange]: ShulkerOrangeTexture,
        [ShulkerType.Magenta]: ShulkerMagentaTexture,
        [ShulkerType.LightBlue]: ShulkerLightBlueTexture,
        [ShulkerType.Yellow]: ShulkerYellowTexture,
        [ShulkerType.Lime]: ShulkerLimeTexture,
        [ShulkerType.Pink]: ShulkerPinkTexture,
        [ShulkerType.Gray]: ShulkerGrayTexture,
        [ShulkerType.LightGray]: ShulkerLightGrayTexture,
        [ShulkerType.Cyan]: ShulkerCyanTexture,
        [ShulkerType.Purple]: ShulkerPurpleTexture,
        [ShulkerType.Blue]: ShulkerBlueTexture,
        [ShulkerType.Brown]: ShulkerBrownTexture,
        [ShulkerType.Green]: ShulkerGreenTexture,
        [ShulkerType.Red]: ShulkerRedTexture,
        [ShulkerType.Black]: ShulkerBlackTexture,
      }

      const generator = await ShulkerTextureGenerator.build(base, material)
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
