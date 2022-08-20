import type { MaterialTexture } from '../../assets/material'

export interface MaterialsSelectorProps {
  material: MaterialTexture
}

const MaterialsSelector = ({ material }: MaterialsSelectorProps): JSX.Element => {
  return (
    <li>
      <input
        id={`material-${material.id}`}
        className='peer hidden'
        type='checkbox'
        onChange={(event) => {
          console.log(event.target.checked)
        }}
      />
      <label
        htmlFor={`material-${material.id}`}
        className='inline-flex cursor-pointer rounded border border-gray-300 bg-white p-4 hover:bg-gray-50 peer-checked:border-blue-500'
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
