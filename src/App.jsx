import React from 'react'
import PortfolioComparision from './features/portfolio-comparsion'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import DayWeekMonth from './features/day-week-month'
import Home from './pages/home'

const App = () => {
  return (
    <div className='main_container'> 
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio-comparision" element={<PortfolioComparision />} />
        <Route path="/day-week-month" element={<DayWeekMonth />} />
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App