import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { ShulkerType } from '@/lib/common'

import Code from './Code'

import type { LootTable } from '@/lib/lootTable'

const OutputLootTableShulker = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [lootTables, setLootTables] = useState<Partial<Record<ShulkerType, LootTable>>>({})

  useEffect(() => {
    if (generators.lootTable?.shulker == null) {
      return
    }

    const generator = generators.lootTable?.shulker
    const tables = Object.values(ShulkerType).reduce<Partial<Record<ShulkerType, LootTable>>>((acc, type) => {
      return { ...acc, [type]: generator.generate(type) }
    }, {})
    setLootTables(tables)
  }, [generators.lootTable?.shulker])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(lootTables).map(([type, lootTable]) => {
          return (
            <Code
              key={type}
              lang={generators.lootTable?.shulker?.path(type as ShulkerType)}
              data={JSON.stringify(lootTable, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputLootTableShulker
