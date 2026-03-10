import fotoPerfil from '../assets/logoTelli.png'; 

function About() {
return (
<section className="flex items-center justify-center py-[100px] px-[20px] bg-[#121212] gap-20 flex-wrap">    
    <div className="relative w-full max-w-[300px] md:max-w-none md:w-[350px] h-[300px] md:h-[350px] mx-auto md:mx-0">
        <img src={fotoPerfil} alt="Elias Telli trabajando" className="w-full h-full object-cover rounded-[10px] relative z-[2] shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
        <div className="absolute top-[20px] left-[20px] w-full h-full border-4 border-[#ff6300] rounded-[10px] z-[1]"></div>
    </div>

    <div className="max-w-[500px] font-['Montserrat',_sans-serif]">
        <h4 className="text-[#ff6300] mb-[10px] uppercase tracking-[2px] text-[1.5rem]">SOBRE NOSOTROS</h4>
        <h2 className="text-white text-[2.5rem] leading-[1.2] mt-0 mb-[20px]">Compromiso y Seguridad <br /> en cada trabajo</h2>
        
        <p className="text-[1.3rem] text-[#cccccc] leading-[1.6] mb-[30px]">
        En <strong>Telli Servicios</strong> entendemos que tu hogar es lo más importante. 
        Somos profesionales dedicados a brindar soluciones definitivas 
        en instalaciones de gas y plomería.
        </p>

        <ul className="ist-none p-0 inline-block text-left md:block">
        <li className="text-white mb-[15px] text-[1.1rem]">✅ <strong className="text-[#ff6300]">Matriculado:</strong> Habilitaciones y planos.</li>
        <li className="text-white mb-[15px] text-[1.1rem]">✅ <strong className="text-[#ff6300]">Garantía:</strong> Respaldamos cada reparación.</li>
        <li className="text-white mb-[15px] text-[1.1rem]">✅ <strong className="text-[#ff6300]">Presupuestos Claros:</strong> Sin sorpresas ni letras chicas.</li>
        </ul>
    </div>

    </section>
);
}

export default About;