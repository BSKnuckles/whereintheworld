// Packages
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Detail from './pages/Detail'

// Components
import Header from './components/Header'
import Filter from './components/Filter'
import BackBtn from './components/BackBtn'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: null,
      inverseTheme: null,
      allCountries: [],
      visibleCountries: [],
      regions: []
    }
    this.initializeTheme()
    this.fetchCountries()
  }

  fetchCountries = () => {
    fetch('https://restcountries.com/v2/all?fields=name,capital,region,population,flags,alpha3Code')
      .then(res => res.json())
      .then(data => {
        this.setState({
          allCountries: data,
          visibleCountries: data,
          regions: [...new Set(data.map(country => country.region).sort())]
        })
      })
  }
  searchCountries = search => {
    let countries = this.state.allCountries.filter(country => {
      if (
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.capital.toLowerCase().includes(search.toLowerCase())
      )
        return true
      else return false
    })
    this.setState({
      visibleCountries: countries
    })
  }
  filterByRegion = region => {
    let countries = []
    if (region !== 'all') {
      countries = this.state.allCountries.filter(country => (country.region === region ? true : false))
    } else {
      countries = this.state.allCountries
    }
    this.setState({
      visibleCountries: countries
    })
  }

  initializeTheme = () => {
    if (localStorage.getItem('countries_app')) {
      const { theme, inverseTheme } = JSON.parse(localStorage.getItem('countries_app'))
      let state = this.state
      state.theme = theme
      state.inverseTheme = inverseTheme
      this.setState(state)
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        let state = this.state
        state.theme = 'dark'
        state.inverseTheme = 'light'
        this.setState(state)
        localStorage.setItem(
          'countries_app',
          JSON.stringify({
            theme: 'dark',
            inverseTheme: 'light'
          })
        )
      } else {
        this.setState({
          theme: 'light',
          inverseTheme: 'dark'
        })
        localStorage.setItem(
          'countries_app',
          JSON.stringify({
            theme: 'light',
            inverseTheme: 'dark'
          })
        )
      }
    }
  }
  toggleTheme = () => {
    if (this.state.theme === 'dark') {
      this.setState({
        theme: 'light',
        inverseTheme: 'dark'
      })
      localStorage.setItem(
        'countries_app',
        JSON.stringify({
          theme: 'light',
          inverseTheme: 'dark'
        })
      )
    } else {
      this.setState({
        theme: 'dark',
        inverseTheme: 'light'
      })
      localStorage.setItem(
        'countries_app',
        JSON.stringify({
          theme: 'dark',
          inverseTheme: 'light'
        })
      )
    }
  }

  render() {
    return (
      <Router>
        <div className={this.state.theme}>
          <div className='w-screen min-h-screen bg-light-background dark:bg-dark-background'>
            <div className='flex justify-center px-8 bg-light-elements dark:bg-dark-elements'>
              <Header
                theme={this.state.theme}
                inverseTheme={this.state.inverseTheme}
                toggleTheme={theme => this.toggleTheme(theme)}
              />
            </div>
            <div className='flex justify-center px-8 pb-8'>
              <main className='max-w-5xl w-full'>
                <Switch>
                  <Route path='/detail/:code'>
                    <nav className='py-10'>
                      <BackBtn />
                    </nav>
                    <Detail />
                  </Route>
                  <Route path='/'>
                    <Filter
                      regions={this.state.regions}
                      search={search => this.searchCountries(search)}
                      filter={region => this.filterByRegion(region)}
                    />
                    <Home countries={this.state.visibleCountries} />
                  </Route>
                </Switch>
              </main>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
