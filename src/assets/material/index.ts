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

export const MaterialCopperTexture: MaterialTexture = { namespace: 'minecraft', name: 'copper', src: Copper }
export const MaterialIronTexture: MaterialTexture = { namespace: 'minecraft', name: 'iron', src: Iron }
export const MaterialGoldTexture: MaterialTexture = { namespace: 'minecraft', name: 'gold', src: Gold }
export const MaterialDiamondTexture: MaterialTexture = { namespace: 'minecraft', name: 'diamond', src: Diamond }
export const MaterialNetheriteTexture: MaterialTexture = { namespace: 'minecraft', name: 'netherite', src: Netherite }
