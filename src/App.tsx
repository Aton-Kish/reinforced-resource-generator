import { FC } from 'react'

import {
  MaterialCopperTexture,
  MaterialDiamondTexture,
  MaterialGoldTexture,
  MaterialIronTexture,
  MaterialNetheriteTexture,
} from './assets/material'
import Barrel from './components/Barrel'
import Chest from './components/Chest'
import Shulker from './components/Shulker'

const App: FC = () => {
  const materials = {
    copper: MaterialCopperTexture,
    iron: MaterialIronTexture,
    gold: MaterialGoldTexture,
    diamond: MaterialDiamondTexture,
    netherite: MaterialNetheriteTexture,
  }

  return (
    <>
      {Object.entries(materials).map(([name, material]) => (
        <div key={name}>
          <Chest material={material} />
          <Shulker material={material} />
          <Barrel material={material} />
        </div>
      ))}
    </>
  )
}

export default App
