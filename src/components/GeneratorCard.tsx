import JSZip from 'jszip'
import { useContext, useEffect, useRef, useState } from 'react'

import { GeneratorsContext, ProjectContext } from '@/contexts'
import { BarrelAdvancementGenerator, ChestAdvancementGenerator, ShulkerAdvancementGenerator } from '@/lib/advancement'
import { BarrelBlockStateGenerator, ChestBlockStateGenerator, ShulkerBlockStateGenerator } from '@/lib/blockState'
import { BarrelType, ChestType, ShulkerType, ShulkerUpgradeFrom } from '@/lib/common'
import { BarrelLanguageGenerator, ChestLanguageGenerator, ShulkerLanguageGenerator } from '@/lib/language'
import { BarrelLootTableGenerator, ChestLootTableGenerator, ShulkerLootTableGenerator } from '@/lib/lootTable'
import {
  BarrelBlockModelGenerator,
  BlockModelBarrelType,
  ChestBlockModelGenerator,
  ShulkerBlockModelGenerator,
} from '@/lib/model/block'
import { BarrelItemModelGenerator, ChestItemModelGenerator, ShulkerItemModelGenerator } from '@/lib/model/item'
import { BarrelRecipeGenerator, ChestRecipeGenerator, ShulkerRecipeGenerator } from '@/lib/recipe'
import { BarrelTextureGenerator, ChestTextureGenerator, ShulkerTextureGenerator } from '@/lib/texture'

import Input from './Input'
import Output from './Output'

import type { Generators, MaterialTextureOption } from '@/contexts'

interface Props {
  material: MaterialTextureOption
}

const GeneratorCard = ({ material }: Props): JSX.Element => {
  const { project } = useContext(ProjectContext)
  const [isOpen, setIsOpen] = useState(false)
  const [generators, setGenerators] = useState<Generators>({})
  const buttonEl = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const load = async () => {
      const generators: Generators = {
        texture: {
          chest: await ChestTextureGenerator.build(project.chest, material),
          shulker: await ShulkerTextureGenerator.build(project.shulker, material),
          barrel: await BarrelTextureGenerator.build(project.barrel, material),
        },
        language: {
          chest: new ChestLanguageGenerator(project.chest, material),
          shulker: new ShulkerLanguageGenerator(project.shulker, material),
          barrel: new BarrelLanguageGenerator(project.barrel, material),
        },
        blockModel: {
          chest: new ChestBlockModelGenerator(project.chest, material),
          shulker: new ShulkerBlockModelGenerator(project.shulker, material),
          barrel: new BarrelBlockModelGenerator(project.barrel, material),
        },
        itemModel: {
          chest: new ChestItemModelGenerator(project.chest, material),
          shulker: new ShulkerItemModelGenerator(project.shulker, material),
          barrel: new BarrelItemModelGenerator(project.barrel, material),
        },
        blockState: {
          chest: new ChestBlockStateGenerator(project.chest, material),
          shulker: new ShulkerBlockStateGenerator(project.shulker, material),
          barrel: new BarrelBlockStateGenerator(project.barrel, material),
        },
        lootTable: {
          chest: new ChestLootTableGenerator(project.chest, material),
          shulker: new ShulkerLootTableGenerator(project.shulker, material),
          barrel: new BarrelLootTableGenerator(project.barrel, material),
        },
        recipe: {
          chest: new ChestRecipeGenerator(project.chest, material),
          shulker: new ShulkerRecipeGenerator(project.shulker, project.chest, material),
          barrel: new BarrelRecipeGenerator(project.barrel, material),
        },
        advancement: {
          chest: new ChestAdvancementGenerator(project.chest, material),
          shulker: new ShulkerAdvancementGenerator(project.shulker, project.chest, material),
          barrel: new BarrelAdvancementGenerator(project.barrel, material),
        },
      }
      setGenerators(generators)
    }

    load()
  }, [project, material])

  return (
    <GeneratorsContext.Provider value={{ generators, setGenerators }}>
      <div className={`overflow-hidden rounded-lg border ${isOpen ? 'border-blue-500' : ''}`}>
        <div
          className='flex cursor-pointer items-center gap-2 p-4 hover:bg-blue-50'
          onClick={(e) => {
            if (buttonEl.current?.contains(e.target as HTMLElement)) {
              return
            }

            setIsOpen(!isOpen)
          }}
        >
          <img className='w-8' src={material.src} alt={material.name} title={material.name} />
          <h2 className='text-2xl'>{`${material.namespace}:${material.name}`}</h2>
          <span className='flex-auto' />
          <button
            ref={buttonEl}
            className='rounded border border-gray-300 bg-white p-1 hover:bg-blue-50 peer-checked:border-blue-500'
            onClick={async () => {
              const zip = new JSZip()

              for (const type of Object.values(ChestType)) await generators.texture?.chest?.zip(zip, type)
              for (const type of Object.values(ShulkerType)) await generators.texture?.shulker?.zip(zip, type)
              for (const type of Object.values(BarrelType)) await generators.texture?.barrel?.zip(zip, type)

              await generators.language?.chest?.zip(zip)
              await generators.language?.shulker?.zip(zip)
              await generators.language?.barrel?.zip(zip)

              await generators.blockModel?.chest?.zip(zip)
              for (const type of Object.values(ShulkerType)) await generators.blockModel?.shulker?.zip(zip, type)
              for (const type of Object.values(BlockModelBarrelType))
                await generators.blockModel?.barrel?.zip(zip, type)

              await generators.itemModel?.chest?.zip(zip)
              for (const type of Object.values(ShulkerType)) await generators.itemModel?.shulker?.zip(zip, type)
              await generators.itemModel?.barrel?.zip(zip)

              await generators.blockState?.chest?.zip(zip)
              for (const type of Object.values(ShulkerType)) await generators.blockState?.shulker?.zip(zip, type)
              await generators.blockState?.barrel?.zip(zip)

              await generators.lootTable?.chest?.zip(zip)
              for (const type of Object.values(ShulkerType)) await generators.lootTable?.shulker?.zip(zip, type)
              await generators.lootTable?.barrel?.zip(zip)

              await generators.recipe?.chest?.zip(zip)
              for (const type of Object.values(ShulkerType))
                await generators.recipe?.shulker?.zip(zip, ShulkerUpgradeFrom.Shulker, type)
              await generators.recipe?.shulker?.zip(zip, ShulkerUpgradeFrom.Chest)
              await generators.recipe?.barrel?.zip(zip)

              await generators.advancement?.chest?.zip(zip)
              for (const from of Object.values(ShulkerUpgradeFrom))
                await generators.advancement?.shulker?.zip(zip, from)
              await generators.advancement?.barrel?.zip(zip)

              const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' })

              const url = URL.createObjectURL(blob)
              const download = document.createElement('a')
              download.href = url
              download.download = `${material.namespace}_${material.name}.zip`
              download.click()
              URL.revokeObjectURL(url)
            }}
          >
            <svg className='mx-auto h-6 w-6' fill='currentColor' viewBox='0 0 48 48'>
              <path d='M11 40q-1.2 0-2.1-.9Q8 38.2 8 37v-7.15h3V37h26v-7.15h3V37q0 1.2-.9 2.1-.9.9-2.1.9Zm13-7.65-9.65-9.65 2.15-2.15 6 6V8h3v18.55l6-6 2.15 2.15Z' />
            </svg>
          </button>
        </div>
        <div className={isOpen ? 'h-full' : 'h-0'}>
          <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-[360px_1fr]'>
            <Input material={material} />
            <Output />
          </div>
        </div>
      </div>
    </GeneratorsContext.Provider>
  )
}

export default GeneratorCard
