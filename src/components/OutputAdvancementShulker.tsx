import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { ShulkerUpgradeFrom } from '@/lib/common'

import Code from './Code'

import type { Advancement } from '@/lib/advancement'

const OutputAdvancementShulker = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [advancements, setAdvancements] = useState<Partial<Record<ShulkerUpgradeFrom, Advancement>>>({})

  useEffect(() => {
    if (generators.advancement?.shulker == null) {
      return
    }

    const generator = generators.advancement?.shulker
    const advancements = Object.values(ShulkerUpgradeFrom).reduce<Partial<Record<ShulkerUpgradeFrom, Advancement>>>(
      (acc, from) => {
        return { ...acc, [from]: generator.generate(from) }
      },
      {},
    )
    setAdvancements(advancements)
  }, [generators.advancement?.shulker])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(advancements).map(([from, advancement]) => {
          return (
            <Code
              key={from}
              lang={generators.advancement?.shulker?.path(from as ShulkerUpgradeFrom)}
              data={JSON.stringify(advancement, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputAdvancementShulker
