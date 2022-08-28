import { useContext, useState } from 'react'

import { MaterialContext } from '@/contexts'

import type { MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const InputMaterialLower = ({ material }: Props): JSX.Element => {
  const { materials, setMaterials } = useContext(MaterialContext)
  const [chestValid, setChestValid] = useState(true)
  const [shulkerValid, setShulkerValid] = useState(true)
  const [barrelValid, setBarrelValid] = useState(true)

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text-base'>Lower Tier</h4>
      <div className='grid grid-cols-1 gap-1 md:grid-cols-[80px_1fr]'>
        <label htmlFor={`material-lower-chest-${material.id}`} className='md:(h-8 leading-8) text-sm'>
          Chest
        </label>
        <input
          id={`material-lower-chest-${material.id}`}
          className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
          type='text'
          defaultValue={`${material.lower.chest.namespace}:${material.lower.chest.name}`}
          onBlur={(event) => {
            const match = event.target.value.match(/^([0-9a-z_-]+):([0-9a-z_-]+)$/)

            if (match == null) {
              setChestValid(false)
              return
            }

            setChestValid(true)
            const namespace = match[1]
            const name = match[2]
            setMaterials({
              ...materials,
              [material.id]: {
                ...material,
                lower: { ...material.lower, chest: { ...material.lower.chest, namespace, name } },
              },
            })
          }}
        />
        {!chestValid && (
          <label htmlFor={`material-lower-chest-${material.id}`} className='text-sm text-red-500 md:col-span-2'>
            *Please input namespace:name format.
          </label>
        )}

        <label htmlFor={`material-lower-shulker-${material.id}`} className='md:(h-8 leading-8) text-sm'>
          Shulker
        </label>
        <input
          id={`material-lower-shulker-${material.id}`}
          className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
          type='text'
          defaultValue={`${material.lower.shulker.namespace}:${material.lower.shulker.name}`}
          onBlur={(event) => {
            const match = event.target.value.match(/^([0-9a-z_-]+):([0-9a-z_-]+)$/)

            if (match == null) {
              setShulkerValid(false)
              return
            }

            setShulkerValid(true)
            const namespace = match[1]
            const name = match[2]
            setMaterials({
              ...materials,
              [material.id]: {
                ...material,
                lower: { ...material.lower, shulker: { ...material.lower.shulker, namespace, name } },
              },
            })
          }}
        />
        {!shulkerValid && (
          <label htmlFor={`material-lower-shulker-${material.id}`} className='text-sm text-red-500 md:col-span-2'>
            *Please input namespace:name format.
          </label>
        )}

        <label htmlFor={`material-lower-barrel-${material.id}`} className='md:(h-8 leading-8) text-sm'>
          Barrel
        </label>
        <input
          id={`material-lower-barrel-${material.id}`}
          className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
          type='text'
          defaultValue={`${material.lower.barrel.namespace}:${material.lower.barrel.name}`}
          onBlur={(event) => {
            const match = event.target.value.match(/^([0-9a-z_-]+):([0-9a-z_-]+)$/)

            if (match == null) {
              setBarrelValid(false)
              return
            }

            setBarrelValid(true)
            const namespace = match[1]
            const name = match[2]
            setMaterials({
              ...materials,
              [material.id]: {
                ...material,
                lower: { ...material.lower, barrel: { ...material.lower.barrel, namespace, name } },
              },
            })
          }}
        />
        {!barrelValid && (
          <label htmlFor={`material-lower-barrel-${material.id}`} className='text-sm text-red-500 md:col-span-2'>
            *Please input namespace:name format.
          </label>
        )}
      </div>
    </div>
  )
}

export default InputMaterialLower
