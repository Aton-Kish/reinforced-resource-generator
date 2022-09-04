import OutputAdvancement from './OutputAdvancement'
import OutputBlockModel from './OutputBlockModel'
import OutputBlockState from './OutputBlockState'
import OutputItemModel from './OutputItemModel'
import OutputLanguage from './OutputLanguage'
import OutputLootTable from './OutputLootTable'
import OutputRecipe from './OutputRecipe'
import OutputTexture from './OutputTexture'

const Output = (): JSX.Element => {
  return (
    <div className='flex flex-col gap-2 overflow-hidden'>
      <h2 className='text-2xl'>Output</h2>
      <OutputTexture />
      <OutputLanguage />
      <OutputBlockModel />
      <OutputItemModel />
      <OutputBlockState />
      <OutputLootTable />
      <OutputRecipe />
      <OutputAdvancement />
    </div>
  )
}

export default Output
