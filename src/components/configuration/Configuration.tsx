import Materials from './Materials'

const Configuration = (): JSX.Element => {
  return (
    <div className='rounded-lg border p-4'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl'>Configuration</h2>
        <Materials />
      </div>
    </div>
  )
}

export default Configuration
