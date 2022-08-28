import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { LootTable } from '@/lib/lootTable'

const OutputLootTableChest = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [lootTable, setLootTable] = useState<LootTable>({ type: '', pools: [] })

  useEffect(() => {
    if (generators.lootTable?.chest == null) {
      return
    }

    const generator = generators.lootTable?.chest
    setLootTable(generator.generate())
  }, [generators.lootTable?.chest])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code lang={generators.lootTable?.chest?.path()} data={JSON.stringify(lootTable, null, 2)} />
    </div>
  )
}

export default OutputLootTableChest
