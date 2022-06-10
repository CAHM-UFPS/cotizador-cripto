import { useState } from "react";
import styled from "@emotion/styled";

const Parrafo=styled.p`
    background-color: #b7322d;
    color: #fff;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    text-align: center;
    border-radius: 10px;
`
function Error(){
    return(
        <Parrafo>Debe seleccionar moneda y criptomoneda</Parrafo>
    )
}

export default Error;