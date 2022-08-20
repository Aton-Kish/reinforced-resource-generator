import Materials from './Materials'
import Project from './Project'

const Configuration = (): JSX.Element => {
  return (
    <div className='rounded-lg border p-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl'>Configuration</h2>
        <Project />
        <Materials />
      </div>
    </div>
  )
}

export default Configuration
