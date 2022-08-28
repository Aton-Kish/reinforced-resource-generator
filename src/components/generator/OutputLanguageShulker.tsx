import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { Language } from '@/lib/language'

const OutputLanguageShulker = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [language, setLanguage] = useState<Language>({})

  useEffect(() => {
    if (generators.language?.shulker == null) {
      return
    }

    const generator = generators.language?.shulker
    setLanguage(generator.generate())
  }, [generators.language?.shulker])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <Code lang={generators.language?.shulker?.path()} data={JSON.stringify(language, null, 2)} />
    </div>
  )
}

export default OutputLanguageShulker
