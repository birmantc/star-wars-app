import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import withHeader from './hoc/withHeader'

import PeoplePage from './pages/PeoplePage/PeoplePage'
import PersonPage from './pages/PersonPage/PersonPage'

import './App.css'
import './styles/redefine/bootstrap.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={withHeader(<PeoplePage />)} />
        <Route path='/people/:id' element={withHeader(<PersonPage />)} />
      </Routes>
    </Router>
  )
}

export default App
