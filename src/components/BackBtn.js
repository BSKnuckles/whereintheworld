import { useHistory } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/solid'

export default function BackBtn(props) {
  let history = useHistory()

  function handleClick() {
    history.push('/')
  }

  return (
    <button
      className='bg-light-elements dark:bg-dark-elements text-light-text dark:text-dark-text px-4 py-2 font-semibold text-sm shadow dark:shadow-xl border-dark-input flex items-center'
      onClick={() => handleClick()}>
      <ArrowLeftIcon className='w-5 h-5 text-light-text dark:text-dark-text mr-2' />
      <span>Back</span>
    </button>
  )
}
