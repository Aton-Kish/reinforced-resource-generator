import { createContext } from 'react'

import type { Project } from '@/lib/common'

export interface ProjectContextValue {
  project: Project
  setProject: (project: Project) => void
}

export const ProjectContext = createContext<ProjectContextValue>({
  project: { namespace: { chest: '', shulker: '', barrel: '' } },
  setProject: () => {},
})
