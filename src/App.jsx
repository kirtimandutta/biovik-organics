import Navbar from './components/Navbar'
import ScrollyStory from './components/ScrollyStory'
import Impact from './components/Impact'
import Company from './components/Company'

export default function App() {
  return (
    <div className="min-h-svh bg-black text-white">
      <Navbar />
      <main>
        <ScrollyStory />
        <Impact />
        <Company />
      </main>
    </div>
  )
}
