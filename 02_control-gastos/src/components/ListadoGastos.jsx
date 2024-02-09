import Gasto from "./Gasto";

/* #10.1 creamos un nuevo componente para colocar el listado de los gastos */
const ListadoGastos = ({ gastos, setGastoEditar }) => {
	return (
		<div className="listado-gastos contenedor">
			{/* #10.3 Validamos que hayan gastos para cambiar el titulo */}
			<h2>{gastos.length ? "Gastos" : "No hay gastos aún"}</h2>

			{/* #10.4 Creamos un map para recorrer todos los gastos */}
			{gastos.map((gasto) => (
				<Gasto
					/* #10.6 Le pasamos los props para enviar la información */
					key={gasto.id}
					gasto={gasto}
					/* #14.2 Seguimos pasando el prop */
					setGastoEditar={setGastoEditar}
				/>
			))}
		</div>
	);
};

export default ListadoGastos;
