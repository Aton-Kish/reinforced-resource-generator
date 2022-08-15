import { FC } from 'react'

import Barrel from './components/Barrel'
import Chest from './components/Chest'
import Shulker from './components/Shulker'

const App: FC = () => {
  return (
    <>
      <Chest />
      <Shulker />
      <Barrel />
    </>
  )
}

export default App
