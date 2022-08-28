import { useContext, useEffect, useState } from 'react'

import { GeneratorsContext } from '@/contexts'
import { ShulkerType, ShulkerUpgradeFrom } from '@/lib/common'

import Code from './Code'

import type { Recipe } from '@/lib/recipe'

const OutputRecipeShulker = (): JSX.Element => {
  const { generators } = useContext(GeneratorsContext)
  const [recipes, setRecipes] = useState<Partial<Record<ShulkerUpgradeFrom | ShulkerType, Recipe>>>({})

  useEffect(() => {
    if (generators.recipe?.shulker == null) {
      return
    }

    const generator = generators.recipe?.shulker
    const recipes = Object.values(ShulkerType).reduce<Partial<Record<ShulkerUpgradeFrom | ShulkerType, Recipe>>>(
      (acc, type) => {
        return { ...acc, [type]: generator.generate(ShulkerUpgradeFrom.Shulker, type) }
      },
      {},
    )
    recipes[ShulkerUpgradeFrom.Chest] = generator.generate(ShulkerUpgradeFrom.Chest)
    setRecipes(recipes)
  }, [generators.recipe?.shulker])

  return (
    <div className='flex flex-col gap-1'>
      <h4 className='text'>Shulker</h4>
      <div className='flex flex-col gap-1'>
        {Object.entries(recipes).map(([typeOrFrom, recipe]) => {
          return (
            <Code
              key={typeOrFrom}
              lang={
                typeOrFrom === ShulkerUpgradeFrom.Chest
                  ? generators.recipe?.shulker?.path(ShulkerUpgradeFrom.Chest)
                  : generators.recipe?.shulker?.path(ShulkerUpgradeFrom.Shulker, typeOrFrom as ShulkerType)
              }
              data={JSON.stringify(recipe, null, 2)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default OutputRecipeShulker
