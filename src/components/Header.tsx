import { AppIcon } from '@/assets/icon'

const Header = (): JSX.Element => {
  return (
    <header className='w-full'>
      <div className='container mx-auto flex items-center gap-1 py-4 px-8'>
        <img className='inline w-16' src={AppIcon} alt='ReinfGen' title='ReinfGen' />
        <span className='text-4xl'>ReinfGen</span>
      </div>
    </header>
  )
}

export default Header
