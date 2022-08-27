import { useContext } from 'react'

import { ProjectContext } from '@/contexts'

const Project = (): JSX.Element => {
  const { project, setProject } = useContext(ProjectContext)

  return (
    <div className='flex flex-col gap-1'>
      <h2 className='text-lg'>Project</h2>
      <div className='grid grid-cols-1 gap-1 md:grid-cols-[144px_1fr]'>
        <label htmlFor='project-chest-namespace' className='md:(h-8 leading-8) text-sm'>
          Chest Namespace
        </label>
        <input
          id='project-chest-namespace'
          className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
          type='text'
          defaultValue={project.chest.namespace}
          onBlur={(event) => {
            setProject({ ...project, chest: { ...project.chest, namespace: event.target.value } })
          }}
        />

        <label htmlFor='project-shulker-namespace' className='md:(h-8 leading-8) text-sm'>
          Shulker Namespace
        </label>
        <input
          id='project-shulker-namespace'
          className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
          type='text'
          defaultValue={project.shulker.namespace}
          onBlur={(event) => {
            setProject({ ...project, shulker: { ...project.shulker, namespace: event.target.value } })
          }}
        />

        <label htmlFor='project-barrel-namespace' className='md:(h-8 leading-8) text-sm'>
          Barrel Namespace
        </label>
        <input
          id='project-barrel-namespace'
          className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
          type='text'
          defaultValue={project.barrel.namespace}
          onBlur={(event) => {
            setProject({ ...project, barrel: { ...project.barrel, namespace: event.target.value } })
          }}
        />
      </div>
    </div>
  )
}

export default Project
