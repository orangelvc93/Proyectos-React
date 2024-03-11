/* #12.2 importamos useEffect y useState para manipular el hook de gasto*/
import { useEffect, useState } from "react";

/* #17 Instalamos e importamos la dependencia de react-circular-progressbar */
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/* #3 Creamos un nuevo componente para mostrar la ventana de presupuesto */
const ControlPresupuesto = ({
	presupuesto,
	gastos,
	setGastos,
	setPresupuesto,
	setIsValidPresupuesto,
	setGastosFiltrados,
	setFiltro,
}) => {
	/* "#17.3 creamos un state para editar el value */
	const [porcentaje, setPorcentaje] = useState(0);

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

		/* #17.4 Calculamos el % gastado */
		const nuevoPorcentaje = (
			((presupuesto - totalDisponible) / presupuesto) *
			100
		).toFixed(2);

		setTimeout(() => {
			setPorcentaje(nuevoPorcentaje);
		}, 1500);

		/* --------------------- */

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
	const handleResetApp = () => {
		const resultado = confirm("¿Deseas reiniciar presupuesto y gastos?");

		if (resultado) {
			setGastos([]);
			setPresupuesto(0);
			setIsValidPresupuesto(false);
			setGastosFiltrados([]);
			setFiltro("");
		}
	};

	return (
		<div className="contenedor-presupuesto contenedor sombra dos-columnas">
			<div>
				{/* <p>Grafica aquí</p> */}
				{/* #17.1 Agregamos el componente - creamos el value*/}
				<CircularProgressbar
					styles={buildStyles({
						/* #21.1 Hacemos lo mismo con la gráfica */
						pathColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",
						trailColor: "#f5f5f5",
						textColor: porcentaje > 100 ? "#DC2626" : "#3b82f6",

						/* strokeLinecap: "butt", */
					})}
					value={porcentaje}
					text={`${porcentaje}% Gastado`}
				/>
			</div>
			<div className="contenido-presupuesto">
				<button
					className="reset-app"
					type="button"
					onClick={handleResetApp}
				>
					Resetear App
				</button>
				<p>
					{/* #3.3 Asignamos el state de presupuesto al párrafo */}
					<span>Presupuesto:</span> {formatearCantidad(presupuesto)}
				</p>

				{/* #21 creamos una validacion para que se ponga en rojo cuando sobrepasen el monto maximo */}
				<p className={`${disponible < 0 ? "negativo" : ""}`}>
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
