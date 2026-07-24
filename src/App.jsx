import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Process from './pages/Process'
import Products from './pages/Products'
import Rnd from './pages/Rnd'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="process" element={<Process />} />
          <Route path="products" element={<Products />} />
          <Route path="rnd" element={<Rnd />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
