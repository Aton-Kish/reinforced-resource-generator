import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { Language } from '@/lib/language'

const OutputLanguageBarrel = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [language, setLanguage] = useState<Language>({})

  useEffect(() => {
    if (generators.language?.barrel == null) {
      return
    }

    const generator = generators.language?.barrel
    setLanguage(generator.generate())
  }, [generators.language?.barrel])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code lang={generators.language?.barrel?.path()} data={JSON.stringify(language, null, 2)} />
    </div>
  )
}

export default OutputLanguageBarrel
