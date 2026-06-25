import React from 'react'
import { Footer, Header } from './components'
import HomePage from './pages/home/HomePage'
import { ProductList } from './pages'

const App = () => {
  return (
    <div className='App dark:bg-dark'>
        <Header/>
        <HomePage/>
        <Footer/>
    </div>
  )
}

export default App