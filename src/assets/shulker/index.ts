import { ShulkerType } from '../../lib/shulker'

import Black from './black.png'
import Blue from './blue.png'
import Brown from './brown.png'
import Cyan from './cyan.png'
import Default from './default.png'
import Gray from './gray.png'
import Green from './green.png'
import LightBlue from './light_blue.png'
import LightGray from './light_gray.png'
import Lime from './lime.png'
import Magenta from './magenta.png'
import Orange from './orange.png'
import Pink from './pink.png'
import Purple from './purple.png'
import Red from './red.png'
import White from './white.png'
import Yellow from './yellow.png'

export interface ShulkerTexture {
  type: ShulkerType
  src: string
}

export const ShulkerDefaultTexture: ShulkerTexture = { type: ShulkerType.Default, src: Default }
export const ShulkerWhiteTexture: ShulkerTexture = { type: ShulkerType.White, src: White }
export const ShulkerOrangeTexture: ShulkerTexture = { type: ShulkerType.Orange, src: Orange }
export const ShulkerMagentaTexture: ShulkerTexture = { type: ShulkerType.Magenta, src: Magenta }
export const ShulkerLightBlueTexture: ShulkerTexture = { type: ShulkerType.LightBlue, src: LightBlue }
export const ShulkerYellowTexture: ShulkerTexture = { type: ShulkerType.Yellow, src: Yellow }
export const ShulkerLimeTexture: ShulkerTexture = { type: ShulkerType.Lime, src: Lime }
export const ShulkerPinkTexture: ShulkerTexture = { type: ShulkerType.Pink, src: Pink }
export const ShulkerGrayTexture: ShulkerTexture = { type: ShulkerType.Gray, src: Gray }
export const ShulkerLightGrayTexture: ShulkerTexture = { type: ShulkerType.LightGray, src: LightGray }
export const ShulkerCyanTexture: ShulkerTexture = { type: ShulkerType.Cyan, src: Cyan }
export const ShulkerPurpleTexture: ShulkerTexture = { type: ShulkerType.Purple, src: Purple }
export const ShulkerBlueTexture: ShulkerTexture = { type: ShulkerType.Blue, src: Blue }
export const ShulkerBrownTexture: ShulkerTexture = { type: ShulkerType.Brown, src: Brown }
export const ShulkerGreenTexture: ShulkerTexture = { type: ShulkerType.Green, src: Green }
export const ShulkerRedTexture: ShulkerTexture = { type: ShulkerType.Red, src: Red }
export const ShulkerBlackTexture: ShulkerTexture = { type: ShulkerType.Black, src: Black }
