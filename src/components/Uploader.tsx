import { useContext } from 'react'

import { MaterialContext } from '../contexts'

import UploaderDropzone from './UploaderDropzone'
import UploaderSelector from './UploaderSelector '

import type { FC } from 'react'

const Uploader: FC = () => {
  const { materials } = useContext(MaterialContext)

  return (
    <div className='rounded-lg border p-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl'>Configuration</h2>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg'>Materials</h2>
          <ul className='flex flex-wrap gap-2'>
            {Object.values(materials).map((material) => {
              return <UploaderSelector key={material.id} material={material} />
            })}
          </ul>
          <UploaderDropzone />
        </div>
      </div>
    </div>
  )
}

export default Uploader
