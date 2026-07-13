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

    const [modalTouchStart, setModalTouchStart] = useState<number | null>(null);
    const [modalTouchEnd, setModalTouchEnd] = useState<number | null>(null);

    const transformRef = useRef<any>(null);

    const abrirModal = (trabajo: Trabajo, index: number) => {
        setSelectedTrabajo(trabajo);
        setActiveImgIndex(index);
        setIsLoadingHD(true);
    };

    const cerrarModal = () => {
        setSelectedTrabajo(null);
    };

    const handlePrev = () => {
        if (!selectedTrabajo) return;
        setIsLoadingHD(true);
        setActiveImgIndex((prev) => (prev === 0 ? selectedTrabajo.imagenes.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (!selectedTrabajo) return;
        setIsLoadingHD(true);
        setActiveImgIndex((prev) => (prev === selectedTrabajo.imagenes.length - 1 ? 0 : prev + 1));
    };

    const handleModalTouchStart = (e: TouchEvent) => {
        setModalTouchEnd(null);
        setModalTouchStart(e.targetTouches[0].clientX);
    };

    const handleModalTouchMove = (e: TouchEvent) => {
        setModalTouchEnd(e.targetTouches[0].clientX);
    };

    const handleModalTouchEnd = () => {
        const scale = transformRef.current?.instance.transformState.scale || 1;
        if (scale > 1) return; // Ignorar deslizamientos para cambiar de foto si hay zoom aplicado
        if (!modalTouchStart || !modalTouchEnd) return;
        
        const distance = modalTouchStart - modalTouchEnd;
        const minSwipe = 50;
        
        if (distance > minSwipe) {
            handleNext();
        } else if (distance < -minSwipe) {
            handlePrev();
        }
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

    // Listener de teclado para accesibilidad (ESC, Flechas)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedTrabajo) return;
            if (e.key === "Escape") {
                cerrarModal();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.key === "ArrowRight") {
                handleNext();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedTrabajo, activeImgIndex]);

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
                    <TarjetaTrabajo 
                        key={index} 
                        trabajo={trabajo} 
                        onSelectImage={abrirModal}
                    />
                ))}
            </div>

            {/* Modal de Lightbox con Zoom */}
            <AnimatePresence>
                {selectedTrabajo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={cerrarModal}
                        className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between items-center py-4 px-3 select-none"
                    >
                        {/* Header: Título y Botón Cerrar */}
                        <div 
                            className="w-full max-w-[1200px] flex justify-between items-start text-white z-10 gap-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="min-w-0 flex-1">
                                <span className="text-[#ff6300] font-bold text-xs md:text-sm uppercase font-['Montserrat',_sans-serif]">
                                    {selectedTrabajo.categoria}
                                </span>
                                <h3 className="text-base md:text-xl font-bold font-['Montserrat',_sans-serif] mt-0.5 leading-snug">
                                    {selectedTrabajo.titulo}
                                </h3>
                            </div>
                            <button
                                onClick={cerrarModal}
                                className="text-white/80 hover:text-[#ff6300] text-3xl md:text-4xl font-bold p-1 cursor-pointer transition-colors duration-200 leading-none shrink-0"
                                aria-label="Cerrar modal"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Contenedor Principal del Zoom (Responsive Flexbox) */}
                        <div 
                            className="relative flex-1 w-full max-w-[900px] flex items-center justify-center min-h-0 my-3"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Flecha Izquierda */}
                            {selectedTrabajo.imagenes.length > 1 && (
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-2 md:-left-16 bg-black/60 hover:bg-[#ff6300] text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-20 shadow-lg border border-white/10"
                                    aria-label="Imagen anterior"
                                >
                                    &#10094;
                                </button>
                            )}

                            {/* Componente de Zoom de react-zoom-pan-pinch */}
                            <TransformWrapper
                                ref={transformRef}
                                initialScale={1}
                                minScale={1}
                                maxScale={5}
                                centerOnInit
                            >
                                {({ zoomIn, zoomOut, resetTransform }) => {
                                    // Restablecer el zoom cada vez que se cambia de imagen
                                    useEffect(() => {
                                        resetTransform();
                                    }, [activeImgIndex]);

                                    return (
                                        <>
                                            {/* Controles flotantes */}
                                            <div className="absolute right-4 bottom-4 flex gap-2 z-20 bg-black/55 p-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                                                <button
                                                    onClick={() => zoomIn()}
                                                    className="bg-[#2a2a2a] hover:bg-[#ff6300] text-white w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 font-bold"
                                                    title="Acercar"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => zoomOut()}
                                                    className="bg-[#2a2a2a] hover:bg-[#ff6300] text-white w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 font-bold"
                                                    title="Alejar"
                                                >
                                                    -
                                                </button>
                                                <button
                                                    onClick={() => resetTransform()}
                                                    className="bg-[#2a2a2a] hover:bg-[#ff6300] text-white px-3 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 text-xs font-semibold"
                                                    title="Restablecer"
                                                >
                                                    Reset
                                                </button>
                                            </div>

                                            <TransformComponent
                                                wrapperClass="!w-full !h-full rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing"
                                                contentClass="!w-full !h-full flex items-center justify-center"
                                            >
                                                <div 
                                                    className="relative w-full h-full flex items-center justify-center pointer-events-auto"
                                                    onTouchStart={handleModalTouchStart}
                                                    onTouchMove={handleModalTouchMove}
                                                    onTouchEnd={handleModalTouchEnd}
                                                >
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
                                        </>
                                    );
                                }}
                            </TransformWrapper>

                            {/* Flecha Derecha */}
                            {selectedTrabajo.imagenes.length > 1 && (
                                <button
                                    onClick={handleNext}
                                    className="absolute right-2 md:-right-16 bg-black/60 hover:bg-[#ff6300] text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 z-20 shadow-lg border border-white/10"
                                    aria-label="Siguiente imagen"
                                >
                                    &#10095;
                                </button>
                            )}
                        </div>

                        {/* Tiras de Miniaturas en el pie del Modal */}
                        <div 
                            className="w-full max-w-[600px] flex justify-center gap-1.5 overflow-x-auto py-1 z-10 scrollbar-none shrink-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {selectedTrabajo.imagenes.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={getThumbUrl(img)}
                                    alt={`Miniatura ${idx}`}
                                    onClick={() => {
                                        setIsLoadingHD(true);
                                        setActiveImgIndex(idx);
                                    }}
                                    className={`w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                                        activeImgIndex === idx
                                            ? "border-[#ff6300] scale-105 opacity-100"
                                            : "border-transparent opacity-60 hover:opacity-100"
                                    }`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Portfolio;
