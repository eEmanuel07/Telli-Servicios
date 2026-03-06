import './About.css';
import fotoPerfil from '../assets/logoTelli.png'; 

function About() {
return (
    <section className="about-section">
    
    <div className="about-image-container">
        <img src={fotoPerfil} alt="Elias Telli trabajando" className="about-img" />
        <div className="about-bg-decoration"></div>
    </div>

    <div className="about-content">
        <h4 className="mini-titulo">SOBRE NOSOTROS</h4>
        <h2 className="titulo-principal">Compromiso y Seguridad <br /> en cada trabajo</h2>
        
        <p className="descripcion">
        En <strong>Telli Servicios</strong> entendemos que tu hogar es lo más importante. 
        Somos profesionales dedicados a brindar soluciones definitivas 
        en instalaciones de gas y plomería.
        </p>

        <ul className="lista-ventajas">
        <li>✅ <strong>Matriculado:</strong> Habilitaciones y planos.</li>
        <li>✅ <strong>Garantía:</strong> Respaldamos cada reparación.</li>
        <li>✅ <strong>Presupuestos Claros:</strong> Sin sorpresas ni letras chicas.</li>
        </ul>
    </div>

    </section>
);
}

export default About;