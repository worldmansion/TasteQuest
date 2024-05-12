import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { useData } from './store/appStore'
import { Login } from './pages/Login'
import { RecipeDetail } from './pages/RecipeDetail'

export function AppRouter() {
  const {
    data: { user },
  } = useData()
  if (!user) {
    return <Login />
  }
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail" element={<RecipeDetail />} />
      </Routes>
    </Router>
  )
}
