import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { Advancement } from '@/lib/advancement'

const OutputAdvancementChest = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [advancement, setAdvancement] = useState<Advancement>({
    parent: '',
    rewards: { recipes: [] },
    criteria: {},
    requirements: [],
  })

  useEffect(() => {
    if (generators.advancement?.chest == null) {
      return
    }

    const generator = generators.advancement?.chest
    setAdvancement(generator.generate())
  }, [generators.advancement?.chest])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code lang={generators.advancement?.chest?.path()} data={JSON.stringify(advancement, null, 2)} />
    </div>
  )
}

export default OutputAdvancementChest
