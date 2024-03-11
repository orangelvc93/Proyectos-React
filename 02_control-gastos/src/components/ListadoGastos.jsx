import Gasto from "./Gasto";

/* #10.1 creamos un nuevo componente para colocar el listado de los gastos */
const ListadoGastos = ({
	gastos,
	setGastoEditar,
	eliminarGasto,
	filtro,
	gastosFiltrados,
	setGastosFiltrados,
}) => {
	return (
		<div className="listado-gastos contenedor">
			{/* #10.3 Validamos que hayan gastos para cambiar el titulo */}

			{/* #20.2 Se agregan fragments para hacer la validación de si tiene filtro o no  */}

			{filtro ? (
				<>
					<h2>
						{setGastosFiltrados.length
							? "Gastos"
							: "No Hay Gastos en esta categoría"}
					</h2>
					{gastosFiltrados.map((gasto) => (
						<Gasto
							key={gasto.id}
							gasto={gasto}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
						/>
					))}
				</>
			) : (
				<>
					<h2>{gastos.length ? "Gastos" : "No Hay Gastos aún"}</h2>
					{gastos.map((gasto) => (
						<Gasto
							/* #10.6 Le pasamos los props para enviar la información */
							key={gasto.id}
							gasto={gasto}
							/* #14.2 Seguimos pasando el prop */
							setGastoEditar={setGastoEditar}
							/* #16.2 Pasamos nuevamente el prop */
							eliminarGasto={eliminarGasto}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default ListadoGastos;
