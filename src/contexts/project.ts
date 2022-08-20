import { createContext } from 'react'

export interface Project {
  namespace: ProjectNamespace
}

export interface ProjectNamespace {
  chest: string
  shulker: string
  barrel: string
}

export interface ProjectContextValue {
  project: Project
  setProject: (project: Project) => void
}

export const ProjectContext = createContext<ProjectContextValue>({
  project: { namespace: { chest: '', shulker: '', barrel: '' } },
  setProject: () => {},
})
