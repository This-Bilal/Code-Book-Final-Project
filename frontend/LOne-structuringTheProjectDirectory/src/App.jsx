import React from 'react'
import Home from './pages/Home'
import Header from './components/layout/Header'

const App = () => {
  return (
    <div className=' App dark:bg-dark min-h-screen bg-slate-50 text-slate-500'>
      <Header/>
      <main className=' px-4 py-8'>
        <Home/>
      </main>
    </div>
  )
}

export default App