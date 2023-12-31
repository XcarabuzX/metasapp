import { Link } from 'react-router-dom';
import estilos from './Meta.module.css';
import { useContext } from 'react';
import { Contexto } from '../../services/Memory';

function Meta({id,icono,eventos,periodo,detalles,completado,meta,onMetaCompletada}) {
    const [estado, enviar] = useContext(Contexto);

    const completarMeta = (e) => {
        e.preventDefault();
        enviar({ tipo: 'completar', id });
        onMetaCompletada(id, detalles, completado + 1, meta);
      };


    if(!estado.objetos[id].terminada){
        return ( 
            <Link to={`/lista/${id}`} className={estilos.meta + " tarjeta"}>
                <div className='flex items-center'>
                    <div className={estilos.icono}>{icono}</div>
                        <p className=" ml-3 mr-5 sm:text-xl sm:ml-5 sm:mr-10">
                            {eventos} 
                            <sub className="text-xs text-gray-500 ml-1">/ {periodo}</sub>
                        </p>
                        <p>{detalles}</p>
                </div>
                <div className='flex'>
                    <div className="relative m-2 mx-5">
                        <p className="text-center">{completado} de {meta}</p>
                        <div className={estilos.barra1}>
                            <div 
                                style={{width:`${Math.round((completado/meta) * 100)}%`}}
                                className={estilos.barra2}
                            ></div>
                        </div>
                    </div>
                    <button 
                        className="boton boton--gris"
                        onClick={completarMeta} 
                    >Completado</button>
                </div>
            </Link>
         );

    }
    return(
        <Link to={`/completada/${id}`} className={estilos.meta + " tarjeta"}>
        <div className='flex items-center'>
            <div className={estilos.icono}>{icono}</div>
                <p className="text-xl ml-5 mr-10">
                    {eventos} 
                    <sub className="text-xs text-gray-500 ml-1">/ {periodo}</sub>
                </p>
                <p>{detalles}</p>
        </div>
        <div className='flex items-center'>
            <div className="relative m-2 mx-5">
                <p className="text-center">{completado} de {meta}</p>
                <div className={estilos.barra1}>
                    <div 
                        style={{width:`${Math.round((completado/meta) * 100)}%`}}
                        className={estilos.barra2}
                    ></div>
                </div>
            </div>
            <h3 className='text-green-400 nm-inset-gray-100 rounded-lg text-center mt-1 p-2 sm:w-32'>¡Completada!</h3>
        </div>
    </Link>
    );
}

export default Meta;