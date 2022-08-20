import { useContext } from 'react'

import { MaterialContext } from '../../contexts'

import GeneratorCard from './GeneratorCard'

const Generator = (): JSX.Element => {
  const { materials } = useContext(MaterialContext)

  return (
    <>
      {Object.values(materials).map((material) => {
        return <GeneratorCard key={material.id} material={material} />
      })}
    </>
  )
}

export default Generator
