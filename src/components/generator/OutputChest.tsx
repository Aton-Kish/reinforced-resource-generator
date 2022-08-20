import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { ChestLeftTexture, ChestRightTexture, ChestSingleTexture } from '../../assets/chest'
import { ChestGenerator, ChestType } from '../../lib/chest'

import type { SelectableMaterialTexture } from '../../contexts'
import type { BaseTextures } from '../../lib/chest'

type Images = {
  [type in ChestType]?: string
}

interface Props {
  material: SelectableMaterialTexture
}

const OutputChest = ({ material }: Props): JSX.Element => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: BaseTextures = {
        [ChestType.Single]: await Jimp.read(ChestSingleTexture.src),
        [ChestType.Left]: await Jimp.read(ChestLeftTexture.src),
        [ChestType.Right]: await Jimp.read(ChestRightTexture.src),
      }
      const matl = await Jimp.read(material.src)

      const chest = new ChestGenerator(base, matl)
      const images: Images = {}
      for (const type of Object.values(ChestType)) {
        images[type] = await chest.generate(type).getBase64Async(Jimp.MIME_PNG)
      }
      setImages({ ...images })
    }

    generate()
  }, [material])

  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Chest</h3>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(images).map(([type, src]) => {
          const id = `entity/reinforced_chest/${material.name}/${type}`

          return <img key={`${type}-chest-${material.id}`} className='w-32' src={src} alt={id} title={id} />
        })}
      </div>
    </div>
  )
}

export default OutputChest
