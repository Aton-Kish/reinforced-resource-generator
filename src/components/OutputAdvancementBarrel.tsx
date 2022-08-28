import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { Advancement } from '@/lib/advancement'

const OutputAdvancementBarrel = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [advancement, setAdvancement] = useState<Advancement>({
    parent: '',
    rewards: { recipes: [] },
    criteria: {},
    requirements: [],
  })

  useEffect(() => {
    if (generators.advancement?.barrel == null) {
      return
    }

    const generator = generators.advancement?.barrel
    setAdvancement(generator.generate())
  }, [generators.advancement?.barrel])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code lang={generators.advancement?.barrel?.path()} data={JSON.stringify(advancement, null, 2)} />
    </div>
  )
}

export default OutputAdvancementBarrel
