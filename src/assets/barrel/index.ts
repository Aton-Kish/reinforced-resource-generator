import { BarrelType } from '../../lib/common'

import Bottom from './bottom.png'
import Side from './side.png'
import Top from './top.png'
import TopOpen from './top_open.png'

export interface BarrelTexture {
  type: BarrelType
  src: string
}

export const BarrelTopTexture: BarrelTexture = { type: BarrelType.Top, src: Top }
export const BarrelTopOpenTexture: BarrelTexture = { type: BarrelType.TopOpen, src: TopOpen }
export const BarrelSideTexture: BarrelTexture = { type: BarrelType.Side, src: Side }
export const BarrelBottomTexture: BarrelTexture = { type: BarrelType.Bottom, src: Bottom }
