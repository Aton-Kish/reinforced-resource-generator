import { useContext } from 'react'

import { MaterialContext } from '@/contexts'

import MaterialsSelector from './MaterialsSelector'
import MaterialsUploader from './MaterialsUploader'

const Materials = (): JSX.Element => {
  const { materials } = useContext(MaterialContext)

  return (
    <div className='rounded-lg border p-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl'>Materials</h2>
        <ul className='flex flex-wrap gap-2'>
          {Object.values(materials).map((material) => {
            return <MaterialsSelector key={material.id} material={material} />
          })}
        </ul>
        <MaterialsUploader />
      </div>
    </div>
  )
}

export default Materials
