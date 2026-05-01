import { useState, type MouseEvent, type TouchEvent } from "react";
import { motion } from "framer-motion";

interface Trabajo {
    titulo: string;
    categoria: string;
    imagenes: string[];
    detalles: string;
}

const TarjetaTrabajo = ({ trabajo }: { trabajo: Trabajo }) => {
    const [fotoActual, setFotoActual] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEndEvent = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setFotoActual((prev) => (prev === trabajo.imagenes.length - 1 ? 0 : prev + 1));
        }
        if (isRightSwipe) {
            setFotoActual((prev) => (prev === 0 ? trabajo.imagenes.length - 1 : prev - 1));
        }
    };

    const nextImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setFotoActual((prev) => (prev === trabajo.imagenes.length - 1 ? 0 : prev + 1));
    };

    const prevImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setFotoActual((prev) => (prev === 0 ? trabajo.imagenes.length - 1 : prev - 1));
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="w-full grid bg-[#1e1e1e] rounded-[15px] overflow-hidden transition-transform duration-300 border border-[#333] hover:-translate-y-[10px] hover:border-[#ff6300] group">
            <div className="w-full">
                <div 
                    className="w-[90%] aspect-square bg-black m-[5%] rounded-[15px] h-auto overflow-hidden relative group/img touch-pan-y"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEndEvent}
                >
                    <img
                        src={trabajo.imagenes[fotoActual]}
                        alt={trabajo.titulo}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 select-none pointer-events-none"
                    />

                    {trabajo.imagenes.length > 1 && (
                        <>
                            <button 
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 hover:bg-[#ff6300] z-10"
                                aria-label="Imagen anterior"
                            >
                                &#10094;
                            </button>
                            <button 
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 hover:bg-[#ff6300] z-10"
                                aria-label="Siguiente imagen"
                            >
                                &#10095;
                            </button>
                        </>
                    )}
                </div>

                {trabajo.imagenes.length > 1 && (
                    <div className="w-[90%] m-[0_5%_5%_5%] rounded-[15px] gap-[5px] flex flex-wrap p-[10px] bg-[#151515] justify-center">
                        {trabajo.imagenes.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Vista ${index}`}
                                loading="lazy"
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
        </motion.div>
    );
};

function Portfolio() {
    const misTrabajos: Trabajo[] = [
        {
            titulo: "Instalación de Cañerias de Agua Nueva",
            categoria: "Plomeria",
            imagenes: [
                "/Cañeria nueva de agua/foto1.webp",
                "/Cañeria nueva de agua/foto2.webp",
                "/Cañeria nueva de agua/foto3.webp",
                "/Cañeria nueva de agua/foto4.webp",
            ],
            detalles: "",
        },
        {
            titulo: "Cañeria Nueva Gas Fusion",
            categoria: "Plomería",
            imagenes: [
                "/Cañeria nueva de gas fusión/foto2.webp",
                "/Cañeria nueva de gas fusión/foto3.webp",
                "/Cañeria nueva de gas fusión/foto4.webp",
                "/Cañeria nueva de gas fusión/foto5.webp",
                "/Cañeria nueva de gas fusión/foto6.webp",
                "/Cañeria nueva de gas fusión/foto7.webp",
                "/Cañeria nueva de gas fusión/foto8.webp",
            ],
            detalles: "",
        },
        {
            titulo: "Instalación Nueva de Gabinete",
            categoria: "Gas",
            imagenes: [
                "/Instalacion gabinete nuevo/foto1.webp",
                "/Instalacion gabinete nuevo/foto2.webp",
                "/Instalacion gabinete nuevo/foto3.webp",
                "/Instalacion gabinete nuevo/foto4.webp",
            ],
            detalles: "",
        },
        {
            titulo: "Instalación de Hornos Industriales",
            categoria: "Gas",
            imagenes: [
                "/Instalacion hornos industriales/foto1.webp",
                "/Instalacion hornos industriales/foto2.webp",
            ],
            detalles: "",
        },
        {
            titulo: "Instalación de Cañeria de Gas Epoxi",
            categoria: "Gas",
            imagenes: [
                "/instalacón cañeria epoxi/foto1.webp",
                "/instalacón cañeria epoxi/foto2.webp",
                "/instalacón cañeria epoxi/foto3.webp",
                "/instalacón cañeria epoxi/foto4.webp",
                "/instalacón cañeria epoxi/foto5.webp",
            ],
            detalles: "",
        },
        {
            titulo: "Planos de Istalación de Gas",
            categoria: "Gas",
            imagenes: [
                "/Planos/Marcelo Sabatini_page-0001.webp",
                "/Planos/Walter rodeo del medio_page-0001.webp",
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
            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] px-[20px]">
                {misTrabajos.map((trabajo, index) => (
                    <TarjetaTrabajo key={index} trabajo={trabajo} />
                ))}
            </div>
        </section>
    );
}

export default Portfolio;
