import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

function Hero() {
  const handleWhatsAppClick = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.gtag) {
      // @ts-ignore
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18107033436/WV6SCJjb0qEcENzOjbpD'
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1 
      } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 0px 25px rgba(255,94,0,0.7)",
      transition: { duration: 0.2 }
    },
    pulse: {
      scale: [1, 1.02, 1],
      boxShadow: ["0px 0px 20px rgba(255,94,0,0.4)", "0px 0px 30px rgba(255,94,0,0.8)", "0px 0px 20px rgba(255,94,0,0.4)"],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <section className="bg-black min-h-[50vh] md:min-h-[70vh] flex flex-col justify-center items-center text-center py-[60px] md:py-[40px] px-[20px] overflow-hidden relative">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-10 flex flex-col items-center w-full"
        >
            <motion.h1 
                variants={itemVariants}
                className="text-white font-['Montserrat',_sans-serif] text-[2rem] sm:text-[2.5rem] md:text-[4.5rem] font-black italic m-0 leading-[1] md:leading-[0.7] uppercase break-words"
            >
                SOLUCIONES
            </motion.h1>
            
            <motion.h1 
                variants={itemVariants}
                className="text-[#ff5e00] font-['Montserrat',_sans-serif] text-[2.2rem] sm:text-[3rem] md:text-[5rem] font-black italic m-0 mb-[5px] uppercase leading-[1] md:leading-normal break-words"
            >
                PROFESIONALES
            </motion.h1>
        
            <motion.p 
                variants={itemVariants}
                className="text-[#bfbfbf] text-[0.9rem] md:text-[1.5rem] font-semibold uppercase tracking-[2px] mb-[40px] mt-[10px] px-[10px] md:px-0"
            >
                GAS • PLOMERÍA • MANTENIMIENTO
            </motion.p>
            
            <motion.button 
                variants={buttonVariants}
                initial="hidden"
                animate={["visible", "pulse"]}
                whileHover="hover"
                onClick={() => {
                  handleWhatsAppClick();
                  const telefono = "5492616682376";
                  const mensaje = "Hola Telli Servicios, vengo desde su sitio web y necesito contactarlos.";
                  const linkWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                  window.open(linkWhatsApp, '_blank');
                }}
                className="bg-[#ff6300] text-white font-['Montserrat',_sans-serif] text-[1.2rem] font-extrabold py-[15px] px-[40px] rounded-[4px] cursor-pointer uppercase shadow-[0_0_20px_rgba(255,94,0,0.4)] w-full max-w-[300px] md:w-auto md:max-w-none"
            >
                CONTACTAR AHORA
            </motion.button>
        </motion.div>
    </section>
  );
}

export default Hero;