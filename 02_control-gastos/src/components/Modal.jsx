import { useEffect, useState } from "react";
/* #5.6 Importamos la imagen de cerrar modal */
import CerrarBtn from "../img/cerrar.svg";
import Mensaje from "./Mensaje";

/* #5.4 Creamos el componente de modal */
const Modal = ({
	setModal,
	animarModal,
	setAnimarModal,
	guardarGasto,
	gastoEditar,
	setGastoEditar,
}) => {
	/* #8.3 Creamos un State para el mensaje de error */
	const [mensaje, setMensaje] = useState("");
	/* #8 Creamos los estados para los inputs */
	const [nombre, setNombre] = useState("");
	const [cantidad, setCantidad] = useState("");
	const [categoria, setCategoria] = useState("");
	/* #15.7 creamos un hook para guardar la fecha al momento de editar  */
	const [fecha, setFecha] = useState("");

	/* #15.2 Para identificar el gasto, debemos crear un id */
	const [id, setId] = useState("");

	/* #14.7 usamos useEffect para que se ejecute cuando el componente esté listo
	guardamos los campos al momento de editar*/
	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setNombre(gastoEditar.nombre);
			setCantidad(gastoEditar.cantidad);
			setCategoria(gastoEditar.categoria);
			/* #15.3 Pasamos el id */
			setId(gastoEditar.id);
			/* #15.8 Pasamos la fecha */
			setFecha(gastoEditar.fecha);
		}
	}, []);

	/* #5.7 Creamos la función para ocultar modal  */
	const ocultarModal = () => {
		/* #5.8 usamos el prop aquí  */
		setAnimarModal(false);

		/* #16.7 Le pasamos como un objeto vacío para limpiarlo */
		setGastoEditar({});

		/* #6.5 Agregamos un setTimeout para que primero se cierre la animación y luego cerramos el modal  */
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	/* #8.2 Creamos la función para validar el submit */
	const handleSubmit = (e) => {
		e.preventDefault();

		if ([nombre, cantidad, categoria].includes("")) {
			setMensaje("Todos los campos son obligatorios");

			setTimeout(() => {
				setMensaje("");
			}, 3000);
			return;
		}

		/* #9.3 Agregamos los valores a la función como un objeto 
		#15.4 Agregamos el id al objeto
		#15.9 Agregamos la fecha al objeto
		*/
		guardarGasto({ nombre, cantidad, categoria, id, fecha });
	};

	return (
		<div className="modal">
			{/* #5.5 Creamos el botón de cerrar modal */}
			<div className="cerrar-modal">
				<img
					src={CerrarBtn}
					alt="Cerrar modal"
					onClick={ocultarModal}
				/>
			</div>

			{/* #6.3 Creamos el formulario y le pasamos la condicional de la animación del modal */}
			<form
				/* #8.1 Creamos el evento para validar el submit*/
				onSubmit={handleSubmit}
				className={`formulario ${animarModal ? "animar" : " "}`}
			>
				{/* #15 Creamos la condicional para que cambie dependiendo si editamos o creamos un nuevo gasto */}
				<legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

				{/* #8.4 Agregamos el mensaje de error al formulario */}
				{mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
				{/* #7 Continuamos con la creación del formulario */}

				{/* Nombre gasto */}
				<div className="campo">
					<label htmlFor="nombre">Nombre Gasto</label>
					<input
						id="nombre"
						type="text"
						placeholder="Añade el nombre del gasto"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>

				{/* Cantidad gasto */}
				<div className="campo">
					<label htmlFor="cantidad">Cantidad</label>
					<input
						id="cantidad"
						type="number"
						placeholder="Añade la cantidad del gasto: ej. 300"
						value={cantidad}
						onChange={(e) => setCantidad(e.target.value)}
					/>
				</div>

				{/* Categoria  */}
				<div className="campo">
					<label htmlFor="categoria">Categoría</label>
					<select
						id="categoria"
						value={categoria}
						onChange={(e) => setCategoria(e.target.value)}
					>
						<option value="">-- Selecciona una categoría --</option>
						<option value="ahorro">Ahorro</option>
						<option value="comida">Comida</option>
						<option value="casa">Casa</option>
						<option value="gastos">Gastos Varios</option>
						<option value="ocio">Ocio</option>
						<option value="salud">Salud</option>
						<option value="suscripciones">Suscripciones</option>
					</select>
				</div>

				<input
					type="submit"
					/* #15.1 Creamos la misma validación para el botón */
					value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
				/>
			</form>
		</div>
	);
};

export default Modal;
