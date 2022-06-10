import { useState, useEffect } from "react";
import Error from './Error';
import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from '../data/monedas.js'; //Importar el arreglo de monedas. Entre llaves {nombre_variable}

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s esse;
    margin-top: 30px;

    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`
function Formulario({setMonedas}) {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false); //Mensaje de error

    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu Moneda", monedas); //Declarando el hook creado
    const [cripto, SelectCripto] = useSelectMonedas("Elige tu Criptomoneda", criptos); //Reutilizando el hook creado

    //Llamar API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"; //URL API
            const respuesta = await fetch(url); //Bloquear hasta que la peticion esté lista
            const resultado = await respuesta.json(); //Convertir la respuesta recibida del API en JSON
            //console.log(resultado.Data); //Data es la propiedad que trae el json en donde encuentro los datos importantes

            const arrayCriptos = resultado.Data.map((cripto) => {  //Declaramos un arreglo y lo llenamos
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                };

                return objeto;
            });

            setCriptos(arrayCriptos); //Lleno el stateCriptos con el array que procesa el API
        }

        consultarAPI(); //Metodo que retorna la consulta de API (ARRIBA)
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if ([moneda, cripto].includes("")) {
            setError(true);
            return;
        }

        setError(false);
        setMonedas({moneda, cripto}); //Llenamos el objeto con los datos obtenidos del formulario
    }

    return (
        <>
            {error&& <Error></Error>}
            <form onSubmit={handleSubmit}>
                <SelectMonedas />
                <SelectCripto />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario;