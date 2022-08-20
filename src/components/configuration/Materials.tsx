import { useContext } from 'react'

import { MaterialContext } from '../../contexts'

import MaterialsSelector from './MaterialsSelector'
import MaterialsUploader from './MaterialsUploader'

const Materials = (): JSX.Element => {
  const { materials } = useContext(MaterialContext)

  return (
    <div className='flex flex-col gap-1'>
      <h2 className='text-lg'>Materials</h2>
      <ul className='flex flex-wrap gap-2'>
        {Object.values(materials).map((material) => {
          return <MaterialsSelector key={material.id} material={material} />
        })}
      </ul>
      <MaterialsUploader />
    </div>
  )
}

export default Materials
