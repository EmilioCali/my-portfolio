import Hero from './sections/Hero'
import About from './sections/About'
import Technologies from './sections/Technologies'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <main>
      <CustomCursor />
      <Hero />
      <About />
      <Technologies />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}

export default App
