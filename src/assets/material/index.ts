import { v4 as uuid } from 'uuid'

import Copper from './copper.png'
import Diamond from './diamond.png'
import Gold from './gold.png'
import Iron from './iron.png'
import Netherite from './netherite.png'

export interface MaterialTexture {
  id: string
  namespace: string
  name: string
  src: string
}

export const MaterialCopperTexture: MaterialTexture = {
  id: uuid(),
  namespace: 'minecraft',
  name: 'copper',
  src: Copper,
}

export const MaterialIronTexture: MaterialTexture = {
  id: uuid(),
  namespace: 'minecraft',
  name: 'iron',
  src: Iron,
}

export const MaterialGoldTexture: MaterialTexture = {
  id: uuid(),
  namespace: 'minecraft',
  name: 'gold',
  src: Gold,
}

export const MaterialDiamondTexture: MaterialTexture = {
  id: uuid(),
  namespace: 'minecraft',
  name: 'diamond',
  src: Diamond,
}

export const MaterialNetheriteTexture: MaterialTexture = {
  id: uuid(),
  namespace: 'minecraft',
  name: 'netherite',
  src: Netherite,
}
