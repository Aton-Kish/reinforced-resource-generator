import { useContext } from 'react'

import { MaterialContext } from '../../contexts'

import type { MaterialTexture } from '../../assets/material'
import type { FC } from 'react'

export interface MaterialProps {
  material: MaterialTexture
}

const Material: FC<MaterialProps> = ({ material }) => {
  const { materials, setMaterials } = useContext(MaterialContext)

  return (
    <div>
      <h3 className='text-lg'>Material</h3>
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
    </div>
  )
}

export default Material
