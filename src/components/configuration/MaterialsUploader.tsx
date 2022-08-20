import Jimp from 'jimp'
import { useContext, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { v4 as uuid } from 'uuid'

import { MaterialContext } from '../../contexts'

import type { MaterialTexture } from '../../assets/material'

const MaterialsUploader = (): JSX.Element => {
  const { materials, setMaterials } = useContext(MaterialContext)
  const [rejected, setRejected] = useState<string[]>([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/png': [] },
    onDrop: async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const acceptedMaterials: Record<string, MaterialTexture> = {}
      const rejectedFilenames: string[] = fileRejections.map((fileRejection) => fileRejection.file.name)

      for (const file of acceptedFiles) {
        const id = uuid()
        const name = file.name.split('.').slice(0, -1).join('.')

        const src = URL.createObjectURL(file)
        const jimp = await Jimp.read(src)
        if (!(jimp.getWidth() === 16 && jimp.getHeight() === 16)) {
          rejectedFilenames.push(file.name)
          continue
        }

        const material: MaterialTexture = { id, namespace: '', name, src }
        acceptedMaterials[id] = material
      }

      setMaterials({ ...materials, ...acceptedMaterials })
      setRejected(rejected)
    },
  })

  return (
    <>
      <div
        className='flex cursor-pointer justify-center rounded border-2 border-dashed border-gray-300 p-4'
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col text-center text-gray-500'>
          <svg className='mx-auto h-12 w-12' fill='currentColor'>
            <path d='M29.45 6v3H9v30h30V18.6h3V39q0 1.2-.9 2.1-.9.9-2.1.9H9q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6ZM38 6v4.05h4.05v3H38v4.05h-3v-4.05h-4.05v-3H35V6ZM12 33.9h24l-7.2-9.6-6.35 8.35-4.7-6.2ZM9 9v30V9Z' />
          </svg>
          <p className='text-sm'>Upload material textures</p>
          <p className='text-xs'>Only 16x16 PNG files are supported</p>
        </div>
      </div>

      {rejected.length > 0 && (
        <div className='text-red-500'>
          <p>Rejected files:</p>
          <ul className='list-inside list-disc'>
            {rejected.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default MaterialsUploader
