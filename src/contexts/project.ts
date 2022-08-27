import { createContext } from 'react'

import type { Project } from '@/lib/common'

export interface ProjectContextValue {
  project: Project
  setProject: (project: Project) => void
}

export const ProjectContext = createContext<ProjectContextValue>({
  project: {
    chest: { namespace: '' },
    shulker: { namespace: '' },
    barrel: { namespace: '' },
  },
  setProject: () => {},
})
