
import { Route, Router } from 'wouter'
import './App.css'
import HomePage from './pages/Home/HomePage'
import CountryPage from './pages/Country/Country'

function App() {

  return (
    <main>
       <Router >
          <Route path='/' component={HomePage} />
          <Route path='/country/:ccn3' component={({ params }) => <CountryPage ccn3={params.ccn3} />} />
        </Router>
    </main>
   
  )
}

export default App
