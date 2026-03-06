import "./ServiceCard.css"

interface ServiceCardProps {
    titulo: string;
    descripcion: string;
    icono: string;
    color?: string;
    margin?: string;
}

function ServiceCard({titulo, descripcion, icono, color="#000000", margin="20px"}: ServiceCardProps){
    return (
        <div className="card" style={{borderLeftColor:color}}>
            <h3>
                <span>{titulo}</span>
                <span className="icono">{icono}</span>
            </h3>
            <p style={{marginBottom:margin}}>{descripcion}</p>
            <button><a>Saber mas →</a></button>
        </div>
    );
}

export default ServiceCard;