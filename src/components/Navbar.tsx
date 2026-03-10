import logoTelli from '../assets/logoTelli.png';

function Navbar() {
return (
    <nav id='inicio' className="flex flex-col md:flex-row items-center md:justify-between p-[15px] md:py-[0.2rem] md:px-[2rem] gap-[15px] md:gap-0 bg-black text-white border-b border-[#ff6300]">
    <div className="flex items-center my-[1%] mx-0">
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
    <ul className="flex flex-col md:flex-row list-none m-0 p-0 w-full md:w-auto text-center gap-[20px] md:gap-[30px] text-white">
        <li className="w-full md:w-auto cursor-pointer font-medium transition-colors duration-300 hover:text-[#ff6300]"><a href="#inicio" className="no-underline text-white transition-colors duration-300 ease-in-out hover:text-[#ff5e00]">Inicio</a></li>
        <li className="w-full md:w-auto cursor-pointer font-medium transition-colors duration-300 hover:text-[#ff6300]"><a href="#servicios" className="no-underline text-white transition-colors duration-300 ease-in-out hover:text-[#ff5e00]">Servicios</a></li>
        <li className="w-full md:w-auto cursor-pointer font-medium transition-colors duration-300 hover:text-[#ff6300]"><a href="#presupuestos" className="no-underline text-white transition-colors duration-300 ease-in-out hover:text-[#ff5e00]">Presupuestos</a></li>
        <li className="w-full md:w-auto cursor-pointer font-medium transition-colors duration-300 hover:text-[#ff6300]"><a href="#contacto" className="no-underline text-white transition-colors duration-300 ease-in-out hover:text-[#ff5e00]">Contacto</a></li>
</ul>
    </nav>
);
}

export default Navbar;