import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { Language } from '@/lib/language'

const OutputLanguageChest = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [language, setLanguage] = useState<Language>({})

  useEffect(() => {
    if (generators.language?.chest == null) {
      return
    }

    const generator = generators.language?.chest
    setLanguage(generator.generate())
  }, [generators.language?.chest])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code lang={generators.language?.chest?.path()} data={JSON.stringify(language, null, 2)} />
    </div>
  )
}

export default OutputLanguageChest
