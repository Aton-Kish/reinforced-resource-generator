import { useContext } from 'react'

import { MaterialContext } from '@/contexts'

import type { MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const MaterialsSelector = ({ material }: Props): JSX.Element => {
  const { materials, setMaterials } = useContext(MaterialContext)

  return (
    <li>
      <input
        id={`material-${material.id}`}
        className='peer hidden'
        type='checkbox'
        onChange={(event) => {
          setMaterials({ ...materials, [material.id]: { ...material, selected: event.target.checked } })
        }}
        checked={material.selected}
      />
      <label
        htmlFor={`material-${material.id}`}
        className='inline-flex cursor-pointer rounded border border-gray-300 bg-white p-4 hover:bg-blue-50 peer-checked:border-blue-500'
      >
        <img
          className='w-8'
          src={material.src}
          alt={`${material.namespace}:${material.name}`}
          title={`${material.namespace}:${material.name}`}
        />
      </label>
    </li>
  )
}

export default MaterialsSelector
