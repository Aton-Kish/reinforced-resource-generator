import { BarrelBlockStateGenerator, ChestBlockStateGenerator, ShulkerBlockStateGenerator } from '@/lib/blockState'
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
      chest: await ChestTextureGenerator.build(project.chest, material),
      shulker: await ShulkerTextureGenerator.build(project.shulker, material),
      barrel: await BarrelTextureGenerator.build(project.barrel, material),
    }

    const blockModelGenerators = {
      chest: new ChestBlockModelGenerator(project.chest, material),
      shulker: new ShulkerBlockModelGenerator(project.shulker, material),
      barrel: new BarrelBlockModelGenerator(project.barrel, material),
    }

    const itemModelGenerators = {
      chest: new ChestItemModelGenerator(project.chest, material),
      shulker: new ShulkerItemModelGenerator(project.shulker, material),
      barrel: new BarrelItemModelGenerator(project.barrel, material),
    }

    const blockStateGenerators = {
      chest: new ChestBlockStateGenerator(project.chest, material),
      shulker: new ShulkerBlockStateGenerator(project.shulker, material),
      barrel: new BarrelBlockStateGenerator(project.barrel, material),
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
