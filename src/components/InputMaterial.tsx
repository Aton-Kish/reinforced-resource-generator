import { useContext, useState } from 'react'

import { MaterialContext } from '@/contexts'
import { RecipeType } from '@/lib/common'

import InputMaterialLower from './InputMaterialLower'

import type { MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const InputMaterial = ({ material }: Props): JSX.Element => {
  const { materials, setMaterials } = useContext(MaterialContext)
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='flex flex-col gap-1 overflow-hidden'>
      <div>
        <div
          className='inline-flex cursor-pointer items-center text-lg hover:text-blue-500'
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 48 48'>
            <path d={isOpen ? 'M44 10H4l20 20Z' : 'M10 44V4l20 20Z'} />
          </svg>
          <h3>Material</h3>
        </div>
      </div>
      <div className={`flex flex-col gap-1 ${isOpen ? 'h-full' : 'h-0'}`}>
        <div className='grid grid-cols-1 gap-1 md:grid-cols-[80px_1fr]'>
          <span className='md:(h-8 leading-8) text-sm'>Texture</span>
          <img className='w-8' src={material.src} alt={material.name} title={material.name} />

          <label htmlFor={`material-namespace-${material.id}`} className='md:(h-8 leading-8) text-sm'>
            Namespace
          </label>
          <input
            id={`material-namespace-${material.id}`}
            className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
            type='text'
            defaultValue={material.namespace}
            onBlur={(event) => {
              setMaterials({ ...materials, [material.id]: { ...material, namespace: event.target.value } })
            }}
          />

          <label htmlFor={`material-name-${material.id}`} className='md:(h-8 leading-8) text-sm'>
            Name
          </label>
          <input
            id={`material-name-${material.id}`}
            className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
            type='text'
            defaultValue={material.name}
            onBlur={(event) => {
              setMaterials({ ...materials, [material.id]: { ...material, name: event.target.value } })
            }}
          />
        </div>
        <div className='flex items-center gap-1'>
          <input
            id={`material-has-ingot-${material.id}`}
            className='h-4 w-4'
            type='checkbox'
            onChange={(event) => {
              setMaterials({
                ...materials,
                [material.id]: { ...material, hasIngot: event.target.checked },
              })
            }}
            checked={material.hasIngot}
          />
          <label htmlFor={`material-has-ingot-${material.id}`} className='md:(h-8 leading-8) text-sm'>
            material has ingot type item
          </label>
        </div>
        <div className='flex items-center gap-1'>
          <input
            id={`material-has-ingot-${material.id}`}
            className='h-4 w-4'
            type='checkbox'
            onChange={(event) => {
              setMaterials({
                ...materials,
                [material.id]: {
                  ...material,
                  recipeType: event.target.checked ? RecipeType.Smithing : RecipeType.Crafting,
                },
              })
            }}
            checked={material.recipeType === RecipeType.Smithing}
          />
          <label htmlFor={`material-has-ingot-${material.id}`} className='md:(h-8 leading-8) text-sm'>
            recipe using smithing table
          </label>
        </div>
        <InputMaterialLower material={material} />
      </div>
    </div>
  )
}

export default InputMaterial
