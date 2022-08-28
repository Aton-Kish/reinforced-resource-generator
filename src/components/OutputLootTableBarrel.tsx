import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { LootTable } from '@/lib/lootTable'

const OutputLootTableBarrel = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [lootTable, setLootTable] = useState<LootTable>({ type: '', pools: [] })

  useEffect(() => {
    if (generators.lootTable?.barrel == null) {
      return
    }

    const generator = generators.lootTable?.barrel
    setLootTable(generator.generate())
  }, [generators.lootTable?.barrel])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code lang={generators.lootTable?.barrel?.path()} data={JSON.stringify(lootTable, null, 2)} />
    </div>
  )
}

export default OutputLootTableBarrel
