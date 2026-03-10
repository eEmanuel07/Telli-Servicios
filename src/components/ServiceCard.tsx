interface ServiceCardProps {
    titulo: string;
    descripcion: string;
    icono: string;
    color?: string;
    margin?: string;
}

function ServiceCard({
    titulo,
    descripcion,
    icono,
    color = "#000000",
    margin = "20px",
}: ServiceCardProps) {
    return (
        <div
            className="bg-white text-black border-l-[10px] border-solid p-[20px] text-center w-full max-w-[350px] md:max-w-none md:w-[25%] transition-transform duration-300 shadow-[10px_10px_20px_rgba(0,0,0,0.5)] hover:scale-105"
            style={{ borderLeftColor: color }}
        >
            <h3 className="text-[1.3rem] font-black text-black my-[15px] font-['Montserrat',_sans-serif] flex flex-row gap-2 items-center justify-center">
                <span>{titulo}</span>
                <span className="text-[1.5rem] mb-[10px] mt-[10px]">{icono}</span>
            </h3>

            <p className="w-full text-[1rem]" style={{ marginBottom: margin }}>
                {descripcion}
            </p>

            <a className="bg-transparent border border-black text-black py-[8px] px-[16px] mt-[10px] cursor-pointer rounded-[100px] transition-colors duration-300 hover:bg-black hover:text-white no-underline text-inherit cursor-pointer"> Saber mas →</a>
        </div>
    );
}

export default ServiceCard;