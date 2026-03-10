function WhatsAppBtn() {
    const telefono = "5492616391313"; 
    const mensaje = "Hola Telli Servicios, necesito un presupuesto.";

    const linkWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    return (
    <a href={linkWhatsApp} className="fixed bottom-[30px] right-[30px] w-[60px] h-[60px] bg-[#25d366] rounded-full p-[10px] shadow-[0px_4px_10px_rgba(0,0,0,0.3)] z-[1000] transition-transform duration-300 flex items-center justify-center hover:scale-110 hover:bg-[#1ebe57]" target="_blank" rel="noopener noreferrer">
        <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp"
        className="w-full h-full"
        />
    </a>
    );
}

export default WhatsAppBtn;