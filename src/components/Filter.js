import React from 'react'
import { SearchIcon } from '@heroicons/react/solid'

export default class Filter extends React.Component {
  render() {
    const regions = this.props.regions.map(region => {
      return (
        <option key={region} value={region}>
          {region}
        </option>
      )
    })
    return (
      <form onSubmit={e => e.preventDefault()} className='py-10'>
        <div className='flex flex-col md:flex-row justify-between gap-6'>
          <div className='bg-light-elements dark:bg-dark-elements px-4 py-1 w-full md:w-96'>
            <label className='flex items-center cursor-text'>
              <SearchIcon className='w-5 h-5 text-light-text dark:text-dark-text' />
              <span className='sr-only'>Search for a country</span>
              <input
                type='text'
                placeholder='Search for a country...'
                onChange={e => this.props.search(e.target.value)}
                className=' text-light-text dark:text-dark-text bg-light-elements dark:bg-dark-elements px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-0'
              />
            </label>
          </div>
          <label htmlFor='region' className='sr-only'>
            Choose Region Filter
          </label>
          <select
            name='region'
            onChange={e => this.props.filter(e.target.value)}
            className='bg-light-elements dark:bg-dark-elements text-light-text dark:text-dark-text px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-0'>
            <option value='all'>All</option>
            {regions}
          </select>
        </div>
      </form>
    )
  }
}
