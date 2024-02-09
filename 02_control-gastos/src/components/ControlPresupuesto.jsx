/* #12.2 importamos useEffect y useState para manipular el hook de gasto*/
import { useEffect, useState } from "react";

/* #3 Creamos un nuevo componente para mostrar la ventana de presupuesto */
const ControlPresupuesto = ({ presupuesto, gastos }) => {
	/* #12.4 Creamos un State para iniciar estos valores */
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);
	/* #12.3 creamos el useEffect */
	useEffect(() => {
		/* #12.5 creamos la variable total para luego sumar todos los valores con reduce */
		const totalGastado = gastos.reduce(
			(total, gasto) => parseInt(gasto.cantidad) + parseInt(total),
			0
		);

		const totalDisponible = presupuesto - totalGastado;
		setDisponible(totalDisponible);
		setGastado(totalGastado);
	}, [gastos]);

	/* #3.4 Creamos una función para darle formato al presupuesto */
	const formatearCantidad = (cantidad) => {
		return cantidad.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});
	};

	return (
		<div className="contenedor-presupuesto contenedor sombra dos-columnas">
			<div>
				<p>Grafica aquí</p>
			</div>
			<div className="contenido-presupuesto">
				<p>
					{/* #3.3 Asignamos el state de presupuesto al párrafo */}
					<span>Presupuesto:</span> {formatearCantidad(presupuesto)}
				</p>
				<p>
					{/* #3.5 Creamos un parrafo para la cantidad disponible */}
					<span>Disponible:</span> {formatearCantidad(disponible)}
				</p>
				<p>
					{/* #3.6 Creamos un parrafo para la cantidad gastada */}
					<span>Gastado:</span> {formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};

export default ControlPresupuesto;
