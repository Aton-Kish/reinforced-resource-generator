import { createContext } from 'react'

import { ProjectType } from '@/lib/common'

import type { ProjectConfig } from '@/lib/common'

export interface ProjectContextValue {
  project: Record<ProjectType, ProjectConfig>
  setProject: (project: Record<ProjectType, ProjectConfig>) => void
}

export const ProjectContext = createContext<ProjectContextValue>({
  project: {
    [ProjectType.Chest]: { namespace: '' },
    [ProjectType.Shulker]: { namespace: '' },
    [ProjectType.Barrel]: { namespace: '' },
  },
  setProject: () => {},
})
