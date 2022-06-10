import { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';
import styled from '@emotion/styled'; //CSS por componentes
import ImagenCripto from './img/imagen-criptos.png';

//Elemento en backtics styled.etiqueta a modificar y llama al componente
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`
const Heading = styled.h1` 
  font-family: 'lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`
function App() {
  const [monedas, setMonedas] = useState({}); //Se llenará con los datos obtenidos del formulario
  const [resultado, setResultado] = useState({}); //Alamacena la rta api en un objeto
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setCargando(true);
        setResultado({});
        const { moneda, cripto } = monedas;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado.DISPLAY[cripto][moneda]); //[][] reemplaza los puntos por corchetes para acceder a las variables
        setCargando(false);
      };

      cotizarCripto();
    }
  }, [monedas]);

  return (
    <Contenedor>
      <Imagen src={ImagenCripto} alt="imagenes criptomonedas" /> {/*Puedo usar el componente y añadirle los atributos de la etiqueta normal*/}
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />
        {cargando && <Spinner/>}
        {resultado.PRICE &&
          <Resultado 
            resultado={resultado}
          />}
      </div>
    </Contenedor>
  )
}

export default App
