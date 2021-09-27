import React from 'react'
import { Link } from 'react-router-dom'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

export default class Header extends React.Component {
  render() {
    return (
      <header className='shadow-sm max-w-5xl w-full flex justify-between py-6'>
        <Link to='/'>
          <h1 className='text-light-text dark:text-dark-text font-extra-bold text-xl'>Where in the World?</h1>
        </Link>
        <button
          onClick={() => this.props.toggleTheme(this.props.inverseTheme)}
          className='text-light-text dark:text-dark-text font-semibold flex items-center'>
          {this.props.theme === 'dark' ? (
            <>
              <MoonIcon className='h-6 w-6 color-light-text mr-2' />
              <p>Dark Mode</p>
            </>
          ) : (
            <>
              <SunIcon className='h-6 w-6 color-dark-text mr-2' />
              <p>Light Mode</p>
            </>
          )}
        </button>
      </header>
    )
  }
}
