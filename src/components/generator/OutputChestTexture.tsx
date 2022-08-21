import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { ChestLeftTexture, ChestRightTexture, ChestSingleTexture } from '../../assets/chest'
import { ChestType } from '../../lib/common'
import { ChestGenerator } from '../../lib/texture'

import type { SelectableMaterialTexture } from '../../contexts'
import type { ChestBaseTextures } from '../../lib/texture'

type Images = {
  [type in ChestType]?: string
}

interface Props {
  material: SelectableMaterialTexture
}

const OutputChestTexture = ({ material }: Props): JSX.Element => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: ChestBaseTextures = {
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
      <h4 className='text'>Texture</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(images).map(([type, src]) => {
          const id = `entity/reinforced_chest/${material.name}/${type}`

          return <img key={`${type}-chest-${material.id}`} className='w-32' src={src} alt={id} title={id} />
        })}
      </div>
    </div>
  )
}

export default OutputChestTexture
