export interface ItemModel {
  parent?: string
  textures?: Record<string, string>
  display?: Record<string, Record<string, number[]>>
}
