import Hero from './sections/Hero'
import About from './sections/About'
import Technologies from './sections/Technologies'
import Projects from './sections/Projects'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <main>
      <CustomCursor />
      <Hero />
      <About />
      <Technologies />
      <Projects />
    </main>
  )
}

export default App
