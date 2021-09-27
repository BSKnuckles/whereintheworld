import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function Detail() {
  const { code } = useParams()
  const [data, setData] = useState({ loading: true })

  const formatCurrencies = currencies => {
    let response = ''
    for (let i = 0; i < currencies.length; i++) {
      i < currencies.length - 1
        ? (response += `${currencies[i].name} ${currencies[i].symbol}, `)
        : (response += `${currencies[i].name} ${currencies[i].symbol}`)
    }
    return response
  }
  const formatLanguages = languages => {
    let response = ''
    for (let i = 0; i < languages.length; i++) {
      i < languages.length - 1 ? (response += `${languages[i].name}, `) : (response += languages[i].name)
    }
    return response
  }

  useEffect(() => {
    setData({ loading: true })
    const fetchData = async () => {
      const country = await fetch(`https://restcountries.com/v2/alpha/${code}`).then(res => res.json())
      const borderCodes = country.borders !== undefined ? country.borders : []

      let promises = []
      let borders = []
      borderCodes.forEach(async code => {
        promises.push(
          fetch(`https://restcountries.com/v2/alpha/${code}?fields=name,alpha3Code`)
            .then(res => res.json())
            .then(data => {
              borders.push(
                <Link
                  to={`/detail/${data.alpha3Code}`}
                  key={data.alpha3Code}
                  title={data.name}
                  className='border border-light-input border-opacity-50 bg-light-elements dark:bg-dark-elements px-2 py-1 max-w-24 w-24 hover:bg-light-input hover:bg-opacity-10 hover:dark:bg-opacity-75'>
                  <p className='text-center truncate text-light-text dark:text-dark-text text-xs'>{data.name}</p>
                </Link>
              )
            })
        )
      })

      Promise.all(promises).then(() => {
        setData({ country: country, borders: borders, loading: false })
      })
    }
    fetchData()
  }, [code])

  if (!data.loading) {
    return (
      <div className='grid md:grid-cols-2 gap-12'>
        <img src={data.country.flags[0]} alt={`${data.country.name}'s flag`} />
        <div className='flex flex-col gap-6 mt-6'>
          <h1 className='text-3xl font-extra-bold text-light-text dark:text-dark-text'>{data.country.name}</h1>
          <div className='flex flex-col md:grid md:grid-cols-2 md:gap-x-6 justify-between'>
            <dl className='text-sm'>
              <dt className='inline font-extra-bold text-light-text dark:text-dark-text'>Native Name:</dt>
              <dd className='inline ml-2 text-light-text dark:text-dark-text'>{data.country.nativeName}</dd>
              <br />
              <dt className='inline font-extra-bold text-light-text dark:text-dark-text'>Population:</dt>
              <dd className='inline ml-2 text-light-text dark:text-dark-text'>
                {data.country.population.toLocaleString()}
              </dd>
              <br />
              <dt className='inline font-extra-bold text-light-text dark:text-dark-text'>Region:</dt>
              <dd className='inline ml-2 text-light-text dark:text-dark-text'>{data.country.continent}</dd>
              <br />
              <dt className='inline font-extra-bold text-light-text dark:text-dark-text'>Sub Region:</dt>
              <dd className='inline ml-2 text-light-text dark:text-dark-text'>{data.country.region}</dd>
              <br />
              <dt className='inline font-extra-bold text-light-text dark:text-dark-text'>Capital:</dt>
              <dd className='inline ml-2 text-light-text dark:text-dark-text'>{data.country.capital}</dd>
            </dl>
            <dl className='text-sm mt-6 md:mt-0'>
              <dt className='inline font-extra-bold text-light-text dark:text-dark-text'>Top Level Domain:</dt>
              <dd className='inline ml-2 text-light-text dark:text-dark-text'>{data.country.topLevelDomain}</dd>
              <br />
              <dt className='inline font-extra-bold text-light-text dark:text-dark-text'>Currencies:</dt>
              <dd className='inline ml-2 text-light-text dark:text-dark-text'>
                {data.country.currencies !== undefined
                  ? formatCurrencies(data.country.currencies)
                  : 'No official currency'}
              </dd>
              <br />
              <dt className='inline font-extra-bold text-light-text dark:text-dark-text'>Languages:</dt>
              <dd className='inline ml-2 text-light-text dark:text-dark-text'>
                {formatLanguages(data.country.languages)}
              </dd>
            </dl>
          </div>
          <nav className='flex flex-wrap items-center gap-2'>
            <h3 className='text-light-text dark:text-dark-text font-extra-bold text-sm min-w-48 mr-2 w-full md:w-auto'>
              Border Countries:
            </h3>
            {data.borders.length > 0 ? (
              data.borders
            ) : (
              <p className='text-light-text dark:text-dark-text text-sm'>No countries border {data.country.name}</p>
            )}
          </nav>
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex justify-center mt-12'>
        <div className='lds-ellipsis'>
          <div className='bg-light-text dark:bg-dark-text'></div>
          <div className='bg-light-text dark:bg-dark-text'></div>
          <div className='bg-light-text dark:bg-dark-text'></div>
          <div className='bg-light-text dark:bg-dark-text'></div>
        </div>
      </div>
    )
  }
}
