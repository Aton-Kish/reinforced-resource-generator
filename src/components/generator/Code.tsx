interface Props {
  lang?: string
  data: string
}

const Code = ({ lang, data }: Props): JSX.Element => {
  return (
    <div className='flex flex-col bg-gray-50'>
      {lang && (
        <div className='inline-flex'>
          <span className='bg-gray-200 p-1 text-xs'>{lang}</span>
        </div>
      )}
      <div className='p-4'>
        <pre>{data}</pre>
      </div>
    </div>
  )
}

export default Code
