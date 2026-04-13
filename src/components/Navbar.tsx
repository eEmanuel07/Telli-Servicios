import { useState } from 'react';
import logoTelli from '../assets/logoTelli.webp';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav id='inicio' className="flex flex-col md:flex-row items-center md:justify-between px-[15px] py-[15px] md:py-[0.2rem] md:px-[2rem] bg-black text-white border-b border-[#ff6300]">
            <div className="flex items-center justify-between w-full md:w-auto my-[1%] mx-0">
                <div className="flex items-center">
                    <img src={logoTelli} alt="Logo de Telli Servicios" className="w-[40px] h-[40px] mr-[10px]"/>
                    <h2 className="m-auto flex items-center">
                        <span className="font-['Montserrat',_sans-serif] font-black text-white ml-[8px] text-[1.8rem]">
                            TELLI
                        </span>
                        <span className="font-['Montserrat',_sans-serif] font-black text-[#ff6300] ml-[8px] text-[1.8rem]">
                            Servicios
                        </span>
                    </h2>
                </div>
                
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden block text-[#ff6300] focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        )}
                    </svg>
                </button>
            </div>
            
            <ul className={`${isMenuOpen ? "flex" : "hidden"} mt-[15px] md:mt-0 md:flex flex-col md:flex-row list-none m-0 p-0 w-full md:w-auto text-center gap-[20px] md:gap-[30px] text-white transition-all duration-300 ease-in-out`}>
                <li className="w-full md:w-auto cursor-pointer font-medium transition-colors duration-300 hover:text-[#ff6300]"><a href="#inicio" onClick={() => setIsMenuOpen(false)} className="block w-full md:inline no-underline text-white transition-colors duration-300 ease-in-out hover:text-[#ff5e00] py-2 md:py-0">Inicio</a></li>
                <li className="w-full md:w-auto cursor-pointer font-medium transition-colors duration-300 hover:text-[#ff6300]"><a href="#servicios" onClick={() => setIsMenuOpen(false)} className="block w-full md:inline no-underline text-white transition-colors duration-300 ease-in-out hover:text-[#ff5e00] py-2 md:py-0">Servicios</a></li>
                <li className="w-full md:w-auto cursor-pointer font-medium transition-colors duration-300 hover:text-[#ff6300]"><a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block w-full md:inline no-underline text-white transition-colors duration-300 ease-in-out hover:text-[#ff5e00] py-2 md:py-0">Contacto</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;