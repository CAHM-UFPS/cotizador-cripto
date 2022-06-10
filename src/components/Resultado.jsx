import styled from "@emotion/styled";

const Contenedor = styled.div`
    color: #fff;
    font-family: 'lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`

const Precio = styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`

const Imagen=styled.img`
    display: block;
    width: 120px;
`

function Resultado({ resultado }) {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado; //Desestructurando objeto
    return (
        <Contenedor>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
            <div>
                <Precio>El precio es:<span>{PRICE}</span></Precio>
                <Texto>El precio más alto:<span>{HIGHDAY}</span></Texto>
                <Texto>El precio más bajo: <span>{LOWDAY}</span></Texto>
                <Texto>Cambio 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Ultima Actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
        </Contenedor>
    )
}

export default Resultado;