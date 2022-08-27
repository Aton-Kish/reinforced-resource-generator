import { BarrelBottomTexture, BarrelSideTexture, BarrelTopOpenTexture, BarrelTopTexture } from '@/assets/barrel'
import { ChestLeftTexture, ChestRightTexture, ChestSingleTexture } from '@/assets/chest'
import {
  ShulkerBlackTexture,
  ShulkerBlueTexture,
  ShulkerBrownTexture,
  ShulkerCyanTexture,
  ShulkerDefaultTexture,
  ShulkerGrayTexture,
  ShulkerGreenTexture,
  ShulkerLightBlueTexture,
  ShulkerLightGrayTexture,
  ShulkerLimeTexture,
  ShulkerMagentaTexture,
  ShulkerOrangeTexture,
  ShulkerPinkTexture,
  ShulkerPurpleTexture,
  ShulkerRedTexture,
  ShulkerWhiteTexture,
  ShulkerYellowTexture,
} from '@/assets/shulker'
import { BarrelBlockStateGenerator, ChestBlockStateGenerator, ShulkerBlockStateGenerator } from '@/lib/blockState'
import { BarrelType, ChestType, ShulkerType } from '@/lib/common'
import { BarrelBlockModelGenerator, ChestBlockModelGenerator, ShulkerBlockModelGenerator } from '@/lib/model/block'
import { BarrelItemModelGenerator, ChestItemModelGenerator, ShulkerItemModelGenerator } from '@/lib/model/item'
import { BarrelTextureGenerator, ChestTextureGenerator, ShulkerTextureGenerator } from '@/lib/texture'

import type { BlockStateGenerator } from '@/lib/blockState'
import type { ProjectConfig, ProjectType } from '@/lib/common'
import type { BlockModelGenerator } from '@/lib/model/block'
import type { ItemModelGenerator } from '@/lib/model/item'
import type { MaterialTexture, TextureGenerator } from '@/lib/texture'

export class Generators {
  #project: Record<ProjectType, ProjectConfig>
  #material: MaterialTexture

  #generators?: {
    texture: Record<ProjectType, TextureGenerator>
    blockModel: Record<ProjectType, BlockModelGenerator>
    itemModel: Record<ProjectType, ItemModelGenerator>
    blockState: Record<ProjectType, BlockStateGenerator>
  }

  get generators() {
    return this.#generators
  }

  constructor(project: Record<ProjectType, ProjectConfig>, material: MaterialTexture) {
    this.#project = project
    this.#material = material
  }

  static async build(project: Record<ProjectType, ProjectConfig>, material: MaterialTexture): Promise<Generators> {
    const generators = new Generators(project, material)

    const textureGenerators = {
      chest: await ChestTextureGenerator.build(
        {
          [ChestType.Single]: ChestSingleTexture,
          [ChestType.Left]: ChestLeftTexture,
          [ChestType.Right]: ChestRightTexture,
        },
        material,
      ),
      shulker: await ShulkerTextureGenerator.build(
        {
          [ShulkerType.Default]: ShulkerDefaultTexture,
          [ShulkerType.White]: ShulkerWhiteTexture,
          [ShulkerType.Orange]: ShulkerOrangeTexture,
          [ShulkerType.Magenta]: ShulkerMagentaTexture,
          [ShulkerType.LightBlue]: ShulkerLightBlueTexture,
          [ShulkerType.Yellow]: ShulkerYellowTexture,
          [ShulkerType.Lime]: ShulkerLimeTexture,
          [ShulkerType.Pink]: ShulkerPinkTexture,
          [ShulkerType.Gray]: ShulkerGrayTexture,
          [ShulkerType.LightGray]: ShulkerLightGrayTexture,
          [ShulkerType.Cyan]: ShulkerCyanTexture,
          [ShulkerType.Purple]: ShulkerPurpleTexture,
          [ShulkerType.Blue]: ShulkerBlueTexture,
          [ShulkerType.Brown]: ShulkerBrownTexture,
          [ShulkerType.Green]: ShulkerGreenTexture,
          [ShulkerType.Red]: ShulkerRedTexture,
          [ShulkerType.Black]: ShulkerBlackTexture,
        },
        material,
      ),
      barrel: await BarrelTextureGenerator.build(
        {
          [BarrelType.Top]: BarrelTopTexture,
          [BarrelType.TopOpen]: BarrelTopOpenTexture,
          [BarrelType.Side]: BarrelSideTexture,
          [BarrelType.Bottom]: BarrelBottomTexture,
        },
        material,
      ),
    }

    const blockModelGenerators = {
      chest: new ChestBlockModelGenerator(project.chest, material),
      shulker: new ShulkerBlockModelGenerator(project.chest, material),
      barrel: new BarrelBlockModelGenerator(project.chest, material),
    }

    const itemModelGenerators = {
      chest: new ChestItemModelGenerator(project.chest, material),
      shulker: new ShulkerItemModelGenerator(project.chest, material),
      barrel: new BarrelItemModelGenerator(project.chest, material),
    }

    const blockStateGenerators = {
      chest: new ChestBlockStateGenerator(project.chest, material),
      shulker: new ShulkerBlockStateGenerator(project.chest, material),
      barrel: new BarrelBlockStateGenerator(project.chest, material),
    }

    generators.#generators = {
      texture: textureGenerators,
      blockModel: blockModelGenerators,
      itemModel: itemModelGenerators,
      blockState: blockStateGenerators,
    }

    return generators
  }

  #validate() {
    if (this.#generators == null) {
      throw new Error('initialization not completed')
    }
  }
}
