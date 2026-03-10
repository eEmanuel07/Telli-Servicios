import { useState } from "react";

interface Trabajo {
    titulo: string;
    categoria: string;
    imagenes: string[];
    detalles: string;
}

const TarjetaTrabajo = ({ trabajo }: { trabajo: Trabajo }) => {
    const [fotoActual, setFotoActual] = useState(0);
    
    return (
        <div className="w-[90%] md:w-[30%] m-[2%_1.5%] grid bg-[#1e1e1e] rounded-[15px] overflow-hidden transition-transform duration-300 border border-[#333] hover:-translate-y-[10px] hover:border-[#ff6300] group">
            <div className="w-full">
                <div className="w-[90%] aspect-square bg-black m-[5%] rounded-[15px] h-auto overflow-hidden">
                    <img
                        src={trabajo.imagenes[fotoActual]}
                        alt={trabajo.titulo}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {trabajo.imagenes.length > 1 && (
                    <div className="w-[90%] m-[0_5%_5%_5%] rounded-[15px] gap-[5px] flex flex-wrap p-[10px] bg-[#151515] justify-center">
                        {trabajo.imagenes.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Vista ${index}`}
                                onClick={() => setFotoActual(index)}
                                className={`w-[50px] h-[50px] object-cover rounded-[4px] cursor-pointer transition-all duration-200 border-2 ${fotoActual === index
                                        ? "opacity-100 border-[#ff6300] scale-110"
                                        : "opacity-50 border-transparent hover:opacity-100"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full p-[20px] text-left">
                <span className="text-[#ff6300] text-[1rem] font-bold uppercase m-0 block">
                    {trabajo.categoria}
                </span>
                <h3 className="text-white mt-[5px] mx-0 mb-0 font-['Montserrat',_sans-serif] text-[1.5rem]">
                    {trabajo.titulo}
                </h3>
                {trabajo.detalles && (
                    <h4 className="text-[#cccccc] text-[1rem] mt-[10px] font-normal">
                        {trabajo.detalles}
                    </h4>
                )}
            </div>
        </div>
    );
};

function Portfolio() {
    const misTrabajos: Trabajo[] = [
        {
            titulo: "Instalación de Cañerias de Agua Nueva",
            categoria: "Plomeria",
            imagenes: [
                "public/Cañeria nueva de agua/foto1.jpeg",
                "public/Cañeria nueva de agua/foto2.jpeg",
                "public/Cañeria nueva de agua/foto3.jpeg",
                "public/Cañeria nueva de agua/foto4.jpeg",
            ],
            detalles: "",
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
                "public/Cañeria nueva de gas fusión/foto8.jpeg",
            ],
            detalles: "",
        },
        {
            titulo: "Instalación Nueva de Gabinete",
            categoria: "Gas",
            imagenes: [
                "public/Instalacion gabinete nuevo/foto1.jpeg",
                "public/Instalacion gabinete nuevo/foto2.jpeg",
                "public/Instalacion gabinete nuevo/foto3.jpeg",
                "public/Instalacion gabinete nuevo/foto4.jpeg",
            ],
            detalles: "",
        },
        {
            titulo: "Instalación de Hornos Industriales",
            categoria: "Gas",
            imagenes: [
                "public/Instalacion hornos industriales/foto1.jpeg",
                "public/Instalacion hornos industriales/foto2.jpeg",
            ],
            detalles: "",
        },
        {
            titulo: "Instalación de Cañeria de Gas Epoxi",
            categoria: "Gas",
            imagenes: [
                "public/instalacón cañeria epoxi/foto1.jpeg",
                "public/instalacón cañeria epoxi/foto2.jpeg",
                "public/instalacón cañeria epoxi/foto3.jpeg",
                "public/instalacón cañeria epoxi/foto4.jpeg",
                "public/instalacón cañeria epoxi/foto5.jpeg",
            ],
            detalles: "",
        },
        {
            titulo: "Planos de Istalación de Gas",
            categoria: "Gas",
            imagenes: [
                "public/Planos/Marcelo Sabatini_page-0001.jpg",
                "public/Planos/Walter rodeo del medio_page-0001.jpg",
            ],
            detalles: "",
        },
    ];

    return (
        <section
            id="proyectos"
            className="w-full py-[40px] bg-[#121212] text-center"
        >
            <h4 className="text-[#ff6300] font-['Montserrat',_sans-serif] font-extrabold text-[2.5rem] mt-0 mb-[50px]">
                TRABAJOS DE MUESTRA
            </h4>
            <div className="w-full flex flex-wrap justify-center md:justify-start">
                {misTrabajos.map((trabajo, index) => (
                    <TarjetaTrabajo key={index} trabajo={trabajo} />
                ))}
            </div>
        </section>
    );
}

export default Portfolio;
