function Footer() {
    return (
        <footer id="contacto" className="bg-[#0f0f0f] text-white pt-[60px] border-t-[3px] border-[#ff6300]">

            <div className="flex flex-col md:flex-row md:justify-between flex-wrap max-w-[1200px] mx-auto px-[20px] pb-[40px] gap-[40px] text-center md:text-left">

                <div className="flex-1 min-w-[250px]">
                    <h2 className="font-['Montserrat',_sans-serif] font-black text-[1.8rem] mb-[15px]">
                        TELLI <span className="text-[#ff6300]">Servicios</span>
                    </h2>
                    <p className="text-[#bbbbbb] leading-[1.6]">
                        Soluciones profesionales en plomería y gas. Calidad garantizada.
                    </p>
                </div>

                <div className="flex-1 min-w-[250px]">
                    <h3 className="text-[#ff6300] mb-[20px] text-[1.2rem] uppercase tracking-[1px]">
                        Navegación
                    </h3>
                    <ul className="list-none p-0">
                        <li className="mb-[10px]">
                            <a href="#inicio" className="text-[#e0e0e0] no-underline transition-all duration-300 hover:text-[#ff6300] hover:pl-[5px]">
                                Inicio
                            </a>
                        </li>
                        <li className="mb-[10px]">
                            <a href="#servicios" className="text-[#e0e0e0] no-underline transition-all duration-300 hover:text-[#ff6300] hover:pl-[5px]">
                                Servicios
                            </a>
                        </li>
                        <li className="mb-[10px]">
                            <a href="#presupuestos" className="text-[#e0e0e0] no-underline transition-all duration-300 hover:text-[#ff6300] hover:pl-[5px]">
                                Presupuestos
                            </a>
                        </li>
                        <li className="mb-[10px]">
                            <a href="#contacto" className="text-[#e0e0e0] no-underline transition-all duration-300 hover:text-[#ff6300] hover:pl-[5px]">
                                Contacto
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="flex-1 min-w-[250px]">
                    <h3 className="text-[#ff6300] mb-[20px] text-[1.2rem] uppercase tracking-[1px]">
                        Contacto
                    </h3>
                    <ul className="list-none p-0">
                        <li className="flex items-center justify-center md:justify-start gap-[10px] mb-[15px] text-[#e0e0e0]">
                            <span className="text-[1.2rem]">📍</span>
                            Mendoza, Argentina
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-[10px] mb-[15px] text-[#e0e0e0]">
                            <span className="text-[1.2rem]">📞</span>
                            +54 9 261 639-1313
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-[10px] mb-[15px] text-[#e0e0e0]">
                            <span className="text-[1.2rem]">✉️</span>
                            contacto@telliservicios.com
                        </li>
                    </ul>
                </div>

            </div>

            <div className="bg-black text-center p-[20px] text-[#666] text-[0.9rem]">
                <p className="m-0">
                    &copy; {new Date().getFullYear()} Telli Servicios. Todos los derechos reservados.
                </p>
            </div>

        </footer>
    );
}

export default Footer;