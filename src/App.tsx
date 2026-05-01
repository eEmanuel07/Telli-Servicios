import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServiceCard from './components/ServiceCard'
import About from './components/About'
import Portafolio from './components/Portafolio'
import Footer from './components/Footer'
import WhatsAppBtn from './components/BtnWa'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <div className='main-container'>
      <Navbar />
      <Hero />

      <section id='servicios' className='py-[50px] px-[20px] bg-white'>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px] justify-items-center items-start max-w-[1200px] mx-auto'>
          <ServiceCard
            icono="🔥"
            titulo="Gasista Matriculado"
            descripcion="Instalación de estufas, termotanques, planos y habilitaciones."
            color='#ff6300'
            historia="Gasista matriculado con más de una década de experiencia en el rubro, garantizando trabajos seguros y eficientes contando con el equipamiento necesario para soluciones sin complicaciones"
            trabajos="✅ Instalación de cañería epoxi o fusión
                      ✅ Mantenimiento de artefactos
                      ✅ Detección y reparación de fugas
                      ✅ Instalación de artefactos (matricula para garantia)
                      ✅ Gestiones ante Ecogas"
            consejos="Ante cualquier detección de pérdida, contáctame directamente para evitar demoras o inconvenientes con Ecogas."
          />
          <ServiceCard
            icono="💧"
            titulo="Plomería General"
            descripcion="Instalaciones, reparaciones de fugas, destapes y mantenimiento de cañerías."
            color='#00C3FF'
            historia="Plomero especializado con más de una década de experiencia en el rubro, garantizando trabajos seguros y eficientes contando con el equipamiento necesario para soluciones sin complicaciones"
            trabajos="✅ Instalaciones de caños en termofusión y rosca
                      ✅ Instalación de artefactos nuevos
                      ✅ Instalación cañeria pluviales
                      ✅ Detección y reparación de fugas
                      ✅ Instalación de bombas presurizadoras
                      ✅ Sanitario completos"
            consejos="Recordá: el mantenimiento de tu hogar comienza desde la llave general de agua."
          />

          <ServiceCard
            icono="🛠️"
            titulo="Mantenimiento"
            descripcion="Reparaciones generales del hogar, grifería y sanitarios."
            color='#979797c7'
            trabajos="✅ Limpieza de termotanques
                      ✅ Limpieza de calefones
                      ✅ Mantenimiento de griferia y sanitarios
                      ✅ Cambio de flexibles
                      ✅ Matenimiento tanques de agua y cisternas
                      ✅ Colocación de artefactos nuevos/usados"
            consejos="Se recomienda realizar mantenimiento a los artefactos una vez al año para extender su vida útil."
          />
        </div>
      </section>

      <About />
      <Portafolio />
      <Footer />
      <WhatsAppBtn />
      <Analytics />
    </div>
  )
}

export default App