import { ChestType } from '@/lib/common'

import Left from './left.png'
import Right from './right.png'
import Single from './single.png'

import type { ChestTexture } from '@/lib/texture'

export const ChestSingleTexture: ChestTexture = { type: ChestType.Single, src: Single }
export const ChestLeftTexture: ChestTexture = { type: ChestType.Left, src: Left }
export const ChestRightTexture: ChestTexture = { type: ChestType.Right, src: Right }
