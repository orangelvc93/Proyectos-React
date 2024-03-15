import styled from "@emotion/styled";

const CotizacionStyle = styled.div`
	color: #fff;
	font-family: "Lato", sans-serif;

	display: flex;
	align-items: center;
	gap: 1rem;
	margin-top: 30px;
`;

const Imagen = styled.img`
	display: block;
	width: 120px;
`;
const Precio = styled.p`
	font-size: 24px;
	span {
		font-weight: 700;
	}
`;

const Texto = styled.p`
	font-size: 20px;
	span {
		font-weight: 400;
	}
`;

const Cotizacion = ({ cotizacion }) => {
	/* console.log(cotizacion); */
	const { PRICE, LOWDAY, HIGHDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
		cotizacion;
	return (
		<CotizacionStyle>
			<Imagen
				src={`https://cryptocompare.com/${IMAGEURL}`}
				alt="imagen cripto..."
			/>
			<div>
				<Precio>
					El precio es de: <span>{PRICE}</span>
				</Precio>
				<Texto>
					Precio más alto del día: <span>{HIGHDAY}</span>
				</Texto>
				<Texto>
					Precio más bajo del día: <span>{LOWDAY}</span>
				</Texto>
				<Texto>
					Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span>
				</Texto>
				<Texto>
					Última Actualización: <span>{LASTUPDATE}</span>
				</Texto>
			</div>
		</CotizacionStyle>
	);
};

export default Cotizacion;
