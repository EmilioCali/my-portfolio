import Hero from './sections/Hero'
import About from './sections/About'
import Technologies from './sections/Technologies'
import Experience from './sections/Experience'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <main>
      <CustomCursor />
      <Hero />
      <About />
      <Technologies />
      <Experience />
    </main>
  )
}

export default App