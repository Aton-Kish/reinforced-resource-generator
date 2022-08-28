import { RecipeType } from '@/lib/common'

import Copper from './copper.png'
import Diamond from './diamond.png'
import Gold from './gold.png'
import Iron from './iron.png'
import Netherite from './netherite.png'

import type { MaterialTexture } from '@/lib/texture'

export const MaterialCopperTexture: MaterialTexture = {
  namespace: 'minecraft',
  name: 'copper',
  hasIngot: true,
  lower: {
    chest: { namespace: 'minecraft', name: 'chest' },
    shulker: { namespace: 'minecraft', name: 'shulker_box' },
    barrel: { namespace: 'minecraft', name: 'barrel' },
  },
  recipeType: RecipeType.Crafting,
  src: Copper,
}

export const MaterialIronTexture: MaterialTexture = {
  namespace: 'minecraft',
  name: 'iron',
  hasIngot: true,
  lower: {
    chest: { namespace: 'reinfchest', name: 'copper_chest' },
    shulker: { namespace: 'reinfshulker', name: 'copper_shulker_box' },
    barrel: { namespace: 'reinfbarrel', name: 'copper_barrel' },
  },
  recipeType: RecipeType.Crafting,
  src: Iron,
}

export const MaterialGoldTexture: MaterialTexture = {
  namespace: 'minecraft',
  name: 'gold',
  hasIngot: true,
  lower: {
    chest: { namespace: 'reinfchest', name: 'iron_chest' },
    shulker: { namespace: 'reinfshulker', name: 'iron_shulker_box' },
    barrel: { namespace: 'reinfbarrel', name: 'iron_barrel' },
  },
  recipeType: RecipeType.Crafting,
  src: Gold,
}

export const MaterialDiamondTexture: MaterialTexture = {
  namespace: 'minecraft',
  name: 'diamond',
  hasIngot: false,
  lower: {
    chest: { namespace: 'reinfchest', name: 'gold_chest' },
    shulker: { namespace: 'reinfshulker', name: 'gold_shulker_box' },
    barrel: { namespace: 'reinfbarrel', name: 'gold_barrel' },
  },
  recipeType: RecipeType.Crafting,
  src: Diamond,
}

export const MaterialNetheriteTexture: MaterialTexture = {
  namespace: 'minecraft',
  name: 'netherite',
  hasIngot: true,
  lower: {
    chest: { namespace: 'reinfchest', name: 'diamond_chest' },
    shulker: { namespace: 'reinfshulker', name: 'diamond_shulker_box' },
    barrel: { namespace: 'reinfbarrel', name: 'diamond_barrel' },
  },
  recipeType: RecipeType.Smithing,
  src: Netherite,
}
