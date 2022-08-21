import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { ChestLeftTexture, ChestRightTexture, ChestSingleTexture } from '../../assets/chest'
import { ChestType } from '../../lib/common'
import { ChestGenerator } from '../../lib/texture'

import type { SelectableMaterialTexture } from '../../contexts'
import type { ChestBaseTextures } from '../../lib/texture'

interface Props {
  material: SelectableMaterialTexture
}

const OutputTextureChest = ({ material }: Props): JSX.Element => {
  const [textures, setTextures] = useState<Partial<Record<ChestType, string>>>({})

  useEffect(() => {
    const generate = async () => {
      const base: ChestBaseTextures = {
        [ChestType.Single]: await Jimp.read(ChestSingleTexture.src),
        [ChestType.Left]: await Jimp.read(ChestLeftTexture.src),
        [ChestType.Right]: await Jimp.read(ChestRightTexture.src),
      }
      const matl = await Jimp.read(material.src)

      const generator = new ChestGenerator(base, matl)
      const textures = await Object.values(ChestType).reduce<Promise<Partial<Record<ChestType, string>>>>(
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
      <h4 className='text'>Chest</h4>
      <div className='flex flex-wrap gap-2'>
        {Object.entries(textures).map(([type, src]) => {
          const id = `entity/reinforced_chest/${material.name}/${type}`

          return <img key={`${type}-chest-${material.id}`} className='w-32' src={src} alt={id} title={id} />
        })}
      </div>
    </div>
  )
}

export default OutputTextureChest
