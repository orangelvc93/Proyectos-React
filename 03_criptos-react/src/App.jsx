import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ImagenCripto from "./img/imagen-criptos.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0px auto;
	width: 90%;
	@media (min-width: 892px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Imagen = styled.img`
	max-width: 400px;
	width: 80%;
	margin: 100px auto 0px auto;
	display: block;
`;

const Heading = styled.h1`
	font-family: "Lato", sans-serif;
	color: #fff;
	text-align: center;
	font-weight: 700;
	margin-top: 80px;
	margin-bottom: 50px;
	font-size: 34px;

	&::after {
		content: "";
		width: 100px;
		height: 6px;
		background: #66a2fe;
		display: block;
		margin: 0 auto;
		margin-top: 20px;
	}
`;

function App() {
	const [monedas, setMonedas] = useState({});
	const [cotizacion, setCotizacion] = useState({});

	const [cargando, setCargando] = useState(false);

	useEffect(() => {
		if (Object.keys(monedas).length > 0) {
			/* 	console.log(monedas); */
			setCargando(true);
			setCotizacion({});
			const cotizarCripto = async () => {
				const { moneda, criptomoneda } = monedas;
				const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

				const respuesta = await fetch(url);
				const resultado = await respuesta.json();

				/* console.log(resultado.DISPLAY[criptomoneda][moneda].PRICE); */
				setTimeout(() => {
					setCotizacion(resultado.DISPLAY[criptomoneda][moneda]);
					setCargando(false);
				}, 1000);
			};
			cotizarCripto();
		}
	}, [monedas]);
	return (
		<>
			<Contenedor>
				<Imagen
					src={ImagenCripto}
					alt="Imagenes Cryptos"
				/>
				<div>
					<Heading>Cotiza Criptomonedas al Instante</Heading>
					<Formulario setMonedas={setMonedas} />

					{cargando && <Spinner />}
					{cotizacion.PRICE && <Cotizacion cotizacion={cotizacion} />}
				</div>
			</Contenedor>
		</>
	);
}

export default App;
