import './BtnWa.css';

function WhatsAppBtn() {
    const telefono = "5492611234567"; 
    const mensaje = "Hola Telli Servicios, necesito un presupuesto.";

    const linkWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    return (
    <a href={linkWhatsApp} className="btn-wsp" target="_blank" rel="noopener noreferrer">
        <img 
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp" 
        />
    </a>
    );
}

export default WhatsAppBtn;