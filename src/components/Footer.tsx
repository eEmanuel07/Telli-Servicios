import "./Footer.css";

function Footer() {
    return (
    <footer id="contacto" className="footer">
        <div className="footer-container">

        <div className="footer-col">
            <h2 className="footer-logo">
            TELLI <span className="text-orange">Servicios</span>
            </h2>
            <p className="footer-text">
            Soluciones profesionales en plomería y gas. Calidad garantizada.
            </p>
        </div>

        <div className="footer-col">
            <h3>Navegación</h3>
            <ul className="footer-links">
            <li>
                <a href="#">Inicio</a>
            </li>
            <li>
                <a href="#">Servicios</a>
            </li>
            <li>
                <a href="#">Contacto</a>
            </li>
            <li>
                <a href="#">Presupuestos</a>
            </li>
            </ul>
        </div>

        <div className="footer-col">
            <h3>Contacto</h3>
            <ul className="footer-contact">
            <li>
                <span className="icon">📍</span>
                Mendoza, Argentina
            </li>
            <li>
                <span className="icon">📞</span>
                +54 9 261 639-1313
            </li>
            <li>
                <span className="icon">✉️</span>
                contacto@telliservicios.com
            </li>
            </ul>
        </div>
        </div>

        <div className="footer-bottom">
        <p>
            &copy; {new Date().getFullYear()} Telli Servicios. Todos los derechos
            reservados.
        </p>
        </div>
    </footer>
    );
}

export default Footer;
