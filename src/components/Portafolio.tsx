import { useState } from 'react';
import './Portafolio.css';

interface Trabajo {
    titulo: string;
    categoria: string;
    imagenes: string[];
    detalles: string
}

const TarjetaTrabajo = ({ trabajo }: { trabajo: Trabajo }) => {
const [fotoActual, setFotoActual] = useState(0);

return (
    <div className="portfolio-card">
    <div className='img_conjunto'>
        <div className="imagen-container">
    <img 
        src={trabajo.imagenes[fotoActual]} 
        alt={trabajo.titulo} 
        className="portfolio-img-main"
    />
    </div>

    {trabajo.imagenes.length > 1 && (
        <div className="miniaturas-container">
        {trabajo.imagenes.map((img, index) => (
            <img 
            key={index}
            src={img} 
            alt={`Vista ${index}`}
            onClick={() => setFotoActual(index)}
            className={`miniatura ${fotoActual === index ? 'activa' : ''}`}
            />
        ))}
        </div>
    )}
    </div>

    <div className="portfolio-info">
        <span className="categoria">{trabajo.categoria}</span>
        <h3>{trabajo.titulo}</h3>
        <h4>{trabajo.detalles}</h4>
    </div>
    </div>
);
};

function Portfolio() {

const misTrabajos: Trabajo[] = [
    {
    titulo: "Instalación de Cañerias de Agua Nueva",
    categoria: "Plomeria",
    imagenes: ["public/Cañeria nueva de agua/foto1.jpeg",
        "public/Cañeria nueva de agua/foto2.jpeg",
        "public/Cañeria nueva de agua/foto3.jpeg",
        "public/Cañeria nueva de agua/foto4.jpeg"
    ],
    detalles:""
    },
    {
    titulo: "Cañeria Nueva Gas Fusion",
    categoria: "Plomería",
    imagenes: [
        "public/Cañeria nueva de gas fusión/foto2.jpeg",
        "public/Cañeria nueva de gas fusión/foto3.jpeg",
        "public/Cañeria nueva de gas fusión/foto4.jpeg",
        "public/Cañeria nueva de gas fusión/foto5.jpeg",
        "public/Cañeria nueva de gas fusión/foto6.jpeg",
        "public/Cañeria nueva de gas fusión/foto7.jpeg",
        "public/Cañeria nueva de gas fusión/foto8.jpeg"
    ],
    detalles:""
    },
    {
    titulo: "Instalación Nueva de Gabinete",
    categoria: "Gas",
    imagenes: [
        "public/Instalacion gabinete nuevo/foto1.jpeg",
        "public/Instalacion gabinete nuevo/foto2.jpeg",
        "public/Instalacion gabinete nuevo/foto3.jpeg",
        "public/Instalacion gabinete nuevo/foto4.jpeg"
    ],
    detalles:""
    },
    {
    titulo: "Instalación de Hornos Industriales",
    categoria: "Gas",
    imagenes: [
        "public/Instalacion hornos industriales/foto1.jpeg",
        "public/Instalacion hornos industriales/foto2.jpeg"
    ],
    detalles:""
    },
    {
    titulo: "Instalación de Cañeria de Gas Epoxi",
    categoria: "Gas",
    imagenes: [
        "public/instalacón cañeria epoxi/foto1.jpeg",
        "public/instalacón cañeria epoxi/foto2.jpeg",
        "public/instalacón cañeria epoxi/foto3.jpeg",
        "public/instalacón cañeria epoxi/foto4.jpeg",
        "public/instalacón cañeria epoxi/foto5.jpeg"
    ],
    detalles:""
    },
    {
    titulo: "Planos de Istalación de Gas",
    categoria: "Gas",
    imagenes: [
        "public/Planos/Marcelo Sabatini_page-0001.jpg",
        "public/Planos/Walter rodeo del medio_page-0001.jpg"
    ],
    detalles:""
    }
];

return (
    <section id='proyectos' className="portfolio-section">
    <h4 className="portfolio-title">TRABAJOS DE MUESTRA</h4>
    <div className="portafolio">
        {misTrabajos.map((trabajo, index) => (
        <TarjetaTrabajo key={index} trabajo={trabajo} />
        ))}
    </div>
    </section>
);
}

export default Portfolio;