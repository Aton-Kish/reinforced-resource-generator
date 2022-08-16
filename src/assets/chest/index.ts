import { ChestType } from '../../lib/chest'

import Left from './left.png'
import Right from './right.png'
import Single from './single.png'

export interface ChestTexture {
  type: ChestType
  src: string
}

export const ChestSingleTexture: ChestTexture = { type: ChestType.Single, src: Single }
export const ChestLeftTexture: ChestTexture = { type: ChestType.Left, src: Left }
export const ChestRightTexture: ChestTexture = { type: ChestType.Right, src: Right }
