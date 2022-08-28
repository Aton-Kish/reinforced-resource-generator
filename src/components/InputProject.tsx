import { useContext, useEffect, useRef } from 'react'

import { ProjectContext } from '@/contexts'

import type { MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const InputProject = ({ material }: Props): JSX.Element => {
  const { project, setProject } = useContext(ProjectContext)
  const chestInputEl = useRef<HTMLInputElement>(null)
  const shulkerInputEl = useRef<HTMLInputElement>(null)
  const barrelInputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chestInputEl.current == null) {
      return
    }

    chestInputEl.current.value = project.chest.namespace
  }, [project.chest.namespace])

  useEffect(() => {
    if (shulkerInputEl.current == null) {
      return
    }

    shulkerInputEl.current.value = project.shulker.namespace
  }, [project.shulker.namespace])

  useEffect(() => {
    if (barrelInputEl.current == null) {
      return
    }

    barrelInputEl.current.value = project.barrel.namespace
  }, [project.barrel.namespace])

  return (
    <div className='flex flex-col gap-1'>
      <h3 className='text-lg'>Mod ID</h3>
      <div className='grid grid-cols-1 gap-1 md:grid-cols-[80px_1fr]'>
        <label htmlFor={`project-chest-namespace-${material.id}`} className='md:(h-8 leading-8) text-sm'>
          Chest
        </label>
        <input
          id={`project-chest-namespace-${material.id}`}
          ref={chestInputEl}
          className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
          type='text'
          defaultValue={project.chest.namespace}
          onBlur={(event) => {
            setProject({ ...project, chest: { ...project.chest, namespace: event.target.value } })
            event.target.value = project.chest.namespace
          }}
        />

        <label htmlFor={`project-shulker-namespace-${material.id}`} className='md:(h-8 leading-8) text-sm'>
          Shulker
        </label>
        <input
          id={`project-shulker-namespace-${material.id}`}
          ref={shulkerInputEl}
          className='focus:(border-blue-500 outline-none) w-full appearance-none rounded border border-gray-300 bg-gray-50 p-1 leading-tight text-gray-900'
          type='text'
          defaultValue={project.shulker.namespace}
          onBlur={(event) => {
            setProject({ ...project, shulker: { ...project.shulker, namespace: event.target.value } })
          }}
        />

        <label htmlFor={`project-barrel-namespace-${material.id}`} className='md:(h-8 leading-8) text-sm'>
          Barrel
        </label>
        <input
          id={`project-barrel-namespace-${material.id}`}
          ref={barrelInputEl}
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

export default InputProject
