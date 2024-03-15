import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Error from "./Error";
import useSelectMonedas from "../hooks/useSelectMonedas";
import { monedas } from "../data/monedas";

const InputSubmit = styled.input`
	background: #9497ff;
	border: none;
	width: 100%;
	padding: 10px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background 0.3s ease;
	margin-top: 30px;
	&:hover {
		background: #7a7dfe;
		cursor: pointer;
	}
`;

const Formulario = ({ setMonedas }) => {
	const [criptos, setCriptos] = useState([]);
	const [error, setError] = useState(false);
	const [moneda, SelectMoneda] = useSelectMonedas("Elige tu moneda", monedas);
	const [criptomoneda, SelectCriptomoneda] = useSelectMonedas(
		"Elige tu Criptomoneda",
		criptos
	);

	useEffect(() => {
		const consultarAPI = async () => {
			const url =
				"https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD#";

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			const arrayCriptos = resultado.Data.map((cripto) => {
				const objeto = {
					id: cripto.CoinInfo.Name,
					nombre: cripto.CoinInfo.FullName,
				};
				/* console.log(cripto.CoinInfo.Name);
				console.log(cripto.CoinInfo.FullName); */
				return objeto;
			});

			setCriptos(arrayCriptos);
		};
		consultarAPI();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([criptomoneda, moneda].includes("")) {
			setError(true);

			return;
		}

		setError(false);
		setMonedas({
			moneda,
			criptomoneda,
		});
	};

	return (
		<>
			{error && <Error>Todos los campos son obligatorios</Error>}
			<form onSubmit={handleSubmit}>
				<SelectMoneda />
				<SelectCriptomoneda />

				<InputSubmit
					type="submit"
					value="Cotizar"
				/>
			</form>
		</>
	);
};

export default Formulario;
