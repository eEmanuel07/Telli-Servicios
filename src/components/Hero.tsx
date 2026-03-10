function Hero() {
return (
    <section className="bg-black min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center items-center text-center py-[60px] md:py-[40px] px-[20px]">
        <h1 className="text-white font-['Montserrat',_sans-serif] text-[2rem] sm:text-[2.5rem] md:text-[4.5rem] font-black italic m-0 leading-[1] md:leading-[0.7] uppercase break-words">SOLUCIONES</h1>
        <h1 className="text-[#ff5e00] font-['Montserrat',_sans-serif] text-[2.2rem] sm:text-[3rem] md:text-[5rem] font-black italic m-0 mb-[5px] uppercase leading-[1] md:leading-normal break-words">PROFESIONALES</h1>
    
        <p className="text-[#bfbfbf] text-[0.9rem] md:text-[1.5rem] font-semibold uppercase tracking-[2px] mb-[40px] px-[10px] md:px-0">
        GAS • PLOMERÍA • MANTENIMIENTO
        </p>
        <button className="bg-[#ff6300] text-white font-['Montserrat',_sans-serif] text-[1.2rem] font-extrabold py-[15px] px-[40px] rounded-[4px] cursor-pointer uppercase shadow-[0_0_20px_rgba(255,94,0,0.4)] transition-transform duration-200 hover:scale-105 hover:bg-[#ff6300] w-full max-w-[300px] md:w-auto md:max-w-none">
        CONTACTAR AHORA
        </button>
    </section>
);
}

export default Hero;