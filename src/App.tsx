import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServiceCard from './components/ServiceCard'
import About from './components/About'
import Portafolio from './components/Portafolio' 
import Footer from './components/Footer'
import WhatsAppBtn from './components/BtnWa'

function App() {
  return (
    <div className='main-container'>
      <Navbar />
      <Hero />
      
      <section id='servicios' className='cards'>
        <div className='container-cards'>
          <ServiceCard 
            icono="🔥" 
            titulo="Gasista Matriculado" 
            descripcion="Instalación de estufas, termotanques, planos y habilitaciones."
            color='#ff6300'
          />          
          <ServiceCard 
            icono="💧" 
            titulo="Plomería General" 
            descripcion="Instalaciones, reparaciones de fugas, destapes y mantenimiento de cañerías." 
            color='#00C3FF'
          />

          <ServiceCard 
            icono="🛠️" 
            titulo="Mantenimiento" 
            descripcion="Reparaciones generales del hogar, grifería y sanitarios."
            color='#979797c7'
            margin='35px'
          />
        </div>
      </section>
      <About/>
      <Portafolio/>
      <Footer/>
      <WhatsAppBtn/>
    </div>
  )
}

export default App