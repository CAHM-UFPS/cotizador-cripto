import { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
    color: #fff;
    display: block;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`
const Select = styled.select`
    width: 100%;
    font-size: 10px;
    padding: 14px;
    border-radius: 10px;
`
//Creando un Hook --> Sintaxis primera en minuscula y use ej: useEjemplo.jsx
function useSelectMonedas(label, opciones) {
    const [state, setState]=useState("");

    const SelectMonedas = () => ( //Cuando la funci+on está entre paréntesis es un return de react
        <>
            <Label>{label}</Label>
            <Select value={state} onChange={(e)=>{setState(e.target.value)}}> {/*Obtener el id seleccionado en el select*/}
                <option value="">Seleccione</option>
                {opciones.map((opcion) => { //Declarar la variable a iterar como parametro
                    return(
                        <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option> //Usar key
                    )    
                })}
            </Select>
        </>
    )

    return [state, SelectMonedas]; //Retorno arreglo o la propiedad que desee
}

export default useSelectMonedas;