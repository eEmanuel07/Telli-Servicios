import './Navbar.css';
import logoTelli from '../assets/logoTelli.png';

function Navbar() {
return (
    <nav id='inicio' className="navbar">
    <div className="logo">
    <img src={logoTelli} alt="Logo de Telli Servicios"/>
        <h2>
            <span className='Telli'>
                TELLI
            </span>
        
            <span className='Servicios'>
                Servicios
            </span>
        </h2>
    </div>
    <ul className="nav-links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#proyectos">Proyectos</a></li>
        <li><a href="#contacto">Contacto</a></li>
</ul>
    </nav>
);
}

export default Navbar;