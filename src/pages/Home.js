// import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

// export default class Home extends React.Component {
export default function Home(props) {
  const countries = props.countries.map(country => {
    return (
      <li key={country.alpha3Code} className='w-full overflow-hidden bg-light-elements dark:bg-dark-elements shadow'>
        <Link to={`detail/${country.alpha3Code}`} className='flex flex-col'>
          <section className='p-4 pb-8'>
            <h2 className='font-extra-bold mb-2 truncate text-light-text dark:text-dark-text' title={country.name}>
              {country.name}
            </h2>
            <p className='text-sm text-light-text dark:text-dark-text'>
              <span className='font-extra-bold'>Population:</span> {country.population.toLocaleString()}
            </p>
            <p className='text-sm text-light-text dark:text-dark-text'>
              <span className='font-extra-bold'>Region:</span> {country.region}
            </p>
            {country.capital ? (
              <p className='text-sm text-light-text dark:text-dark-text'>
                <span className='font-extra-bold'>Capital:</span> {country.capital}
              </p>
            ) : null}
          </section>
          <div className='aspect-w-10 aspect-h-6 order-first'>
            <LazyLoadImage src={country.flags[0]} alt={country.name} className='object-cover' />
          </div>
        </Link>
      </li>
    )
  })
  return countries.length === 0 ? (
    <div className='flex justify-center mt-12'>
      <div className='lds-ellipsis'>
        <div className='bg-light-text dark:bg-dark-text'></div>
        <div className='bg-light-text dark:bg-dark-text'></div>
        <div className='bg-light-text dark:bg-dark-text'></div>
        <div className='bg-light-text dark:bg-dark-text'></div>
      </div>
    </div>
  ) : (
    <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-16'>{countries}</ul>
  )
}
