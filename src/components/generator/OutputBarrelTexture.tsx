import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { BarrelBottomTexture, BarrelSideTexture, BarrelTopOpenTexture, BarrelTopTexture } from '../../assets/barrel'
import { BarrelType } from '../../lib/common'
import { BarrelGenerator } from '../../lib/texture'

import type { SelectableMaterialTexture } from '../../contexts'
import type { BarrelBaseTextures } from '../../lib/texture'

type Images = {
  [type in BarrelType]?: string
}

interface Props {
  material: SelectableMaterialTexture
}

const OutputBarrelTexture = ({ material }: Props): JSX.Element => {
  const [images, setImages] = useState<Images>({})

  useEffect(() => {
    const generate = async () => {
      const base: BarrelBaseTextures = {
        [BarrelType.Top]: await Jimp.read(BarrelTopTexture.src),
        [BarrelType.TopOpen]: await Jimp.read(BarrelTopOpenTexture.src),
        [BarrelType.Side]: await Jimp.read(BarrelSideTexture.src),
        [BarrelType.Bottom]: await Jimp.read(BarrelBottomTexture.src),
      }
      const matl = await Jimp.read(material.src)

      const barrel = new BarrelGenerator(base, matl)
      const images: Images = {}
      for (const type of Object.values(BarrelType)) {
        images[type] = await barrel.generate(type).getBase64Async(Jimp.MIME_PNG)
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
          const id = `block/${material.name}_barrel_${type}`

          return <img key={`${type}-barrel-${material.id}`} className='w-8' src={src} alt={id} title={id} />
        })}
      </div>
    </div>
  )
}

export default OutputBarrelTexture
