import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { Recipe } from '@/lib/recipe'

const OutputRecipeBarrel = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [recipe, setRecipe] = useState<Recipe>({ type: '', pattern: [], key: {}, result: { item: '' } })

  useEffect(() => {
    if (generators.recipe?.barrel == null) {
      return
    }

    const generator = generators.recipe?.barrel
    setRecipe(generator.generate())
  }, [generators.recipe?.barrel])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Barrel</h4>
      <Code lang={generators.recipe?.barrel?.path()} data={JSON.stringify(recipe, null, 2)} />
    </div>
  )
}

export default OutputRecipeBarrel
