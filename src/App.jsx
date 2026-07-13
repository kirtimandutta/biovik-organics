import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Technology from './components/Technology'
import Impact from './components/Impact'
import Company from './components/Company'

export default function App() {
  return (
    <div className="min-h-svh bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Technology />
        <Impact />
        <Company />
      </main>
    </div>
  )
}
