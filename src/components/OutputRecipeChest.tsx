import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'

import Code from './Code'

import type { Recipe } from '@/lib/recipe'

const OutputRecipeChest = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [recipe, setRecipe] = useState<Recipe>({ type: '', pattern: [], key: {}, result: { item: '' } })

  useEffect(() => {
    if (generators.recipe?.chest == null) {
      return
    }

    const generator = generators.recipe?.chest
    setRecipe(generator.generate())
  }, [generators.recipe?.chest])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Chest</h4>
      <Code lang={generators.recipe?.chest?.path()} data={JSON.stringify(recipe, null, 2)} />
    </div>
  )
}

export default OutputRecipeChest
