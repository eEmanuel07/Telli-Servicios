import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ServiceCardProps {
    titulo: string;
    descripcion: string;
    icono: string;
    color?: string;
    margin?: string;
    historia?: string;
    trabajos?: string;
    consejos?: string;
}

function ServiceCard({
    titulo,
    descripcion,
    icono,
    color = "#000000",
    margin = "15px",
    historia,
    trabajos,
    consejos
}: ServiceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const isGradient = color.startsWith('linear-gradient');
    const borderStyle = isGradient ? { borderImage: `${color} 1` } : { borderLeftColor: color };
    const highlightColor = isGradient ? '#8b5cf6' : color;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className={`bg-white text-black flex flex-col justify-between border-l-[10px] border-solid px-[14px] py-[20px] text-center w-full max-w-[350px] transition-transform duration-300 shadow-[10px_10px_20px_rgba(0,0,0,0.5)] hover:scale-105 ${
                isExpanded ? "h-auto" : "min-h-[240px]"
            }`}
            style={borderStyle}
        >
            <h3 className="text-[1.15rem] font-black text-black my-[10px] font-['Montserrat',_sans-serif] flex flex-row gap-2 items-center justify-center">
                <span>{titulo}</span>
                <span className="text-[1.3rem] mb-0 mt-0">{icono}</span>
            </h3>

            <div className="w-full text-[0.925rem]" style={{ marginBottom: margin }}>
                <AnimatePresence mode="wait">
                    {!isExpanded ? (
                        <motion.p
                            key="descripcion"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="m-0"
                        >
                            {descripcion}
                        </motion.p>
                    ) : (
                        <motion.div
                            key="detalles"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-[15px] text-left mt-[10px] overflow-hidden"
                        >
                            {historia && (
                                <div>
                                    <h4 className="font-bold text-[1.1rem] m-0 mb-[5px]" style={{ color: highlightColor }}>Historia</h4>
                                    <p className="text-[0.95rem] text-gray-700 m-0 whitespace-pre-line">{historia}</p>
                                </div>
                            )}
                            {trabajos && (
                                <div>
                                    <h4 className="font-bold text-[1.1rem] m-0 mb-[5px]" style={{ color: highlightColor }}>Trabajos</h4>
                                    <p className="text-[0.95rem] text-gray-700 m-0 whitespace-pre-line">{trabajos}</p>
                                </div>
                            )}
                            {consejos && (
                                <div 
                                    className="mt-[5px] p-[12px] rounded-[8px] border-l-[4px] bg-[#f8f9fa]" 
                                    style={{ borderLeftColor: highlightColor }}
                                >
                                    <h4 className="font-bold text-[1.1rem] m-0 mb-[5px] flex items-center gap-[6px]" style={{ color: highlightColor }}>
                                        💡 Consejo
                                    </h4>
                                    <p className="text-[0.95rem] text-gray-800 m-0 whitespace-pre-line italic font-medium">{consejos}</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-transparent border border-black text-black py-[8px] px-[16px] mt-auto cursor-pointer rounded-[100px] transition-colors duration-300 hover:bg-black hover:text-white font-semibold"
            >
                {isExpanded ? "Ver menos" : "Ver más"}
            </button>
        </motion.div>
    );
}

export default ServiceCard;