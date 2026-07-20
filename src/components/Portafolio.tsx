import { useState, useEffect, useRef, type MouseEvent, type TouchEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImagenTrabajo {
    thumbnail: string;
    fullRes?: string;
}

interface Trabajo {
    titulo: string;
    categoria: string;
    imagenes: (string | ImagenTrabajo)[];
    detalles: string;
}

// Helpers para obtener las rutas de miniatura y alta resolución de forma transparente
const getThumbUrl = (img: string | ImagenTrabajo): string => {
    return typeof img === "string" ? img : img.thumbnail;
};

const getFullUrl = (img: string | ImagenTrabajo): string => {
    return typeof img === "string" ? img : (img.fullRes || img.thumbnail);
};

interface TarjetaTrabajoProps {
    trabajo: Trabajo;
    onSelectImage: (trabajo: Trabajo, index: number) => void;
}

const TarjetaTrabajo = ({ trabajo, onSelectImage }: TarjetaTrabajoProps) => {
    const [fotoActual, setFotoActual] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const touchMoved = useRef(false);

    const minSwipeDistance = 50;

    const onTouchStart = (e: TouchEvent) => {
        touchMoved.current = false;
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
        if (touchStart !== null && Math.abs(e.targetTouches[0].clientX - touchStart) > 10) {
            touchMoved.current = true;
        }
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

    const handleCardClick = () => {
        if (touchMoved.current) {
            // Era un deslizamiento, no abrir el modal
            return;
        }
        onSelectImage(trabajo, fotoActual);
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
                    className="w-[90%] aspect-square bg-black m-[5%] rounded-[15px] h-auto overflow-hidden relative group/img touch-pan-y cursor-zoom-in"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEndEvent}
                    onClick={handleCardClick}
                >
                    <img
                        src={getThumbUrl(trabajo.imagenes[fotoActual])}
                        alt={trabajo.titulo}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
                    />

                    {/* Lupa Overlay en Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <div className="bg-black/60 p-3 rounded-full transform scale-75 group-hover/img:scale-100 transition-all duration-300 shadow-xl border border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </div>

                    {trabajo.imagenes.length > 1 && (
                        <>
                            <button 
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 hover:bg-[#ff6300] z-10 cursor-pointer"
                                aria-label="Siguiente imagen"
                            >
                                &#10095;
                            </button>
                            <button 
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 hover:bg-[#ff6300] z-10 cursor-pointer"
                                aria-label="Imagen anterior"
                            >
                                &#10094;
                            </button>
                        </>
                    )}
                </div>

                {trabajo.imagenes.length > 1 && (
                    <div className="w-[90%] m-[0_5%_5%_5%] rounded-[15px] gap-[5px] flex flex-wrap p-[10px] bg-[#151515] justify-center">
                        {trabajo.imagenes.map((img, index) => (
                            <img
                                key={index}
                                src={getThumbUrl(img)}
                                alt={`Vista ${index}`}
                                loading="lazy"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setFotoActual(index);
                                }}
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
    const [selectedTrabajo, setSelectedTrabajo] = useState<Trabajo | null>(null);
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isLoadingHD, setIsLoadingHD] = useState(true);

    const transformRef = useRef<any>(null);

    const abrirModal = (trabajo: Trabajo, index: number) => {
        setSelectedTrabajo(trabajo);
        setActiveImgIndex(index);
        setIsLoadingHD(true);
    };

    const cerrarModal = () => {
        setSelectedTrabajo(null);
    };

    // Bloquear scroll de fondo cuando el modal esté abierto
    useEffect(() => {
        if (selectedTrabajo) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedTrabajo]);

    // Listener de teclado para accesibilidad (ESC)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedTrabajo) return;
            if (e.key === "Escape") {
                cerrarModal();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedTrabajo]);

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
                // Estructura de alta resolución de ejemplo demostrativa:
                {
                    thumbnail: "/Planos/Marcelo Sabatini_page-0001.webp",
                    fullRes: "/Planos/Marcelo Sabatini_page-0001.webp" 
                },
                "/Planos/Walter rodeo del medio_page-0001.webp",
            ],
            detalles: "",
        },
        {
            titulo: "Instalación y Mantenimiento de Aire Acondicionado",
            categoria: "Climatización",
            imagenes: [
                "/Aire acondicionado/01.webp",
                "/Aire acondicionado/02.webp",
                "/Aire acondicionado/03.webp",
                "/Aire acondicionado/04.webp",
                "/Aire acondicionado/05.webp",
                "/Aire acondicionado/06.webp",
                "/Aire acondicionado/07.webp",
            ],
            detalles: "Instalación de equipos Split, carga de refrigerante y mantenimiento preventivo/correctivo.",
        },
        {
            titulo: "Sistemas de Calefacción y Radiadores",
            categoria: "Climatización",
            imagenes: [
                "/Radiadores/01.webp",
                "/Radiadores/02.webp",
                "/Radiadores/03.webp",
                "/Radiadores/04.webp",
                "/Radiadores/05.webp",
                "/Radiadores/06.webp",
                "/Radiadores/07.webp",
                "/Radiadores/08.webp",
                "/Radiadores/09.webp",
                "/Radiadores/10.webp",
            ],
            detalles: "Instalación de calderas, radiadores y tendido de cañerías para calefacción central.",
        },
    ];

    return (
        <section
            id="proyectos"
            className="w-full py-[40px] bg-[#121212] text-center"
        >
            <h4 className="text-[#ff6300] font-['Montserrat',_sans-serif] font-extrabold text-[1.8rem] sm:text-[2.5rem] mt-0 mb-[30px] sm:mb-[50px] px-4 leading-tight">
                TRABAJOS DE MUESTRA
            </h4>
            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] px-[20px]">
                {misTrabajos.map((trabajo, index) => (
                    <TarjetaTrabajo 
                        key={index} 
                        trabajo={trabajo} 
                        onSelectImage={abrirModal}
                    />
                ))}
            </div>

            {/* Modal de Lightbox con Zoom Minimalista */}
            <AnimatePresence>
                {selectedTrabajo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={cerrarModal}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none"
                    >
                        {/* Botón de cierre absoluto */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                cerrarModal();
                            }}
                            className="absolute top-4 right-6 text-white/80 hover:text-[#ff6300] text-4xl font-bold p-2 cursor-pointer transition-colors duration-200 z-50 leading-none"
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>

                        {/* Contenedor Principal del Zoom */}
                        <div 
                            className="relative w-full max-w-[900px] h-[80vh] md:h-[85vh] flex items-center justify-center min-h-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Componente de Zoom de react-zoom-pan-pinch */}
                            <TransformWrapper
                                ref={transformRef}
                                initialScale={1}
                                minScale={1}
                                maxScale={5}
                                centerOnInit
                            >
                                {({ resetTransform }) => {
                                    // Restablecer el zoom cada vez que se cambia de imagen
                                    useEffect(() => {
                                        resetTransform();
                                    }, [activeImgIndex]);

                                    return (
                                        <TransformComponent
                                            wrapperClass="!w-full !h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                                            contentClass="!w-full !h-full flex items-center justify-center"
                                        >
                                            <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                                                {/* Blur placeholder en el fondo (carga progresiva) */}
                                                <img
                                                    src={getThumbUrl(selectedTrabajo.imagenes[activeImgIndex])}
                                                    alt="Placeholder"
                                                    className="absolute max-w-full max-h-full object-contain filter blur-md opacity-30 select-none pointer-events-none"
                                                />

                                                {/* Imagen Principal en alta resolución */}
                                                <img
                                                    src={getFullUrl(selectedTrabajo.imagenes[activeImgIndex])}
                                                    alt={selectedTrabajo.titulo}
                                                    onLoad={() => setIsLoadingHD(false)}
                                                    className={`max-w-full max-h-full object-contain select-none transition-opacity duration-300 ${
                                                        isLoadingHD ? "opacity-0" : "opacity-100"
                                                    }`}
                                                />

                                                {/* Spinner mientras descarga el original */}
                                                {isLoadingHD && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                                                        <div className="w-12 h-12 border-4 border-t-[#ff6300] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </TransformComponent>
                                    );
                                }}
                            </TransformWrapper>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Portfolio;
