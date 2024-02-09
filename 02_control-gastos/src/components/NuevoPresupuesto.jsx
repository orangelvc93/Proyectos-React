import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
	presupuesto,
	setPresupuesto,
	setIsValidPresupuesto,
}) => {
	/* #1.5 Creamos un hook para almacenar el mensaje de validación */
	const [mensaje, setMensaje] = useState("");

	/* #1.4 Creamos la función para el formulario submit  */
	const handlePresupuesto = (e) => {
		e.preventDefault();
		if (!presupuesto || presupuesto < 0) {
			setMensaje("No es un presupuesto valido");
			return;
		}
		setMensaje("");
		/* #2.3 Si pasa la validación cambiar el valor a true */
		setIsValidPresupuesto(true);
	};
	return (
		<div className="contenedor-presupuesto contenedor sombra">
			<form
				onSubmit={handlePresupuesto}
				className="formulario"
			>
				<div className="campo">
					<label htmlFor="">Definir Presupuesto</label>
					<input
						type="number"
						className="nuevo-presupuesto"
						placeholder="Añade tu Presupuesto"
						/* #1.3 Agregamos el valor inicial y un estado para que tome la información */
						value={presupuesto}
						onChange={(e) => setPresupuesto(Number(e.target.value))}
					/>
				</div>
				<input
					type="submit"
					value={"Añadir"}
				/>
				{/*  #1.6 Creamos el componente de Mensaje  */}
				{mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
			</form>
		</div>
	);
};

export default NuevoPresupuesto;
