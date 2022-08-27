export const ProjectType = {
  Chest: 'chest',
  Shulker: 'shulker',
  Barrel: 'barrel',
} as const

export type ProjectType = typeof ProjectType[keyof typeof ProjectType]

export interface ProjectConfig {
  namespace: string
}
