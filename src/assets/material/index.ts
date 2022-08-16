import Copper from './copper.png'
import Diamond from './diamond.png'
import Gold from './gold.png'
import Iron from './iron.png'
import Netherite from './netherite.png'

export interface MaterialTexture {
  namespace: string
  name: string
  src: string
}

export const MaterialCopperTexture = Copper
export const MaterialIronTexture = Iron
export const MaterialGoldTexture = Gold
export const MaterialDiamondTexture = Diamond
export const MaterialNetheriteTexture = Netherite
