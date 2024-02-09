import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
/* #9.6 Importamos el snipet para generar Id */
import { generaId } from "./helpers";
/* #4.1 Importamos la imagen que usaremos para el botón */
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

function App() {
	/* #1 Definimos nuestro State de presupuesto con un Hook */
	const [presupuesto, setPresupuesto] = useState(0);

	/* #2 creamos un hook para comprobar si el valor es valido */
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

	/* #5.2 Creamos el hook del modal */
	const [modal, setModal] = useState(false);
	/* #6 Creamos un hook para darle animación del modal */
	const [animarModal, setAnimarModal] = useState(false);

	/* #9.3 Definimos el Hook para almacenar los valores */
	const [gastos, setGastos] = useState([]);

	/* #14 Creamos state para los datos Editados  */
	const [gastoEditar, setGastoEditar] = useState({});

	/* #14.5 creamos un useEffect para detectar cambios */
	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setModal(true);
			/* #6.1 indicamos que se ejecute luego de un tiempo */
			setTimeout(() => {
				setAnimarModal(true);
			}, 500);
		}
	}, [gastoEditar]);

	/* #5 Creamos una función para el modal */
	const handleModal = () => {
		setModal(true);
		setGastoEditar({});
		/* #6.1 indicamos que se ejecute luego de un tiempo */
		setTimeout(() => {
			setAnimarModal(true);
		}, 500);
	};

	/* #9 Creamos una función para almacenar los valores del gasto */
	const guardarGasto = (gasto) => {
		/* #9.7 agregamos el id al objeto antes de guardarlo */
		gasto.id = generaId();
		/* #10.8 guardamos la fecha en el objeto de gasto */
		gasto.fecha = Date.now();
		/* #9.4 Pasamos el hook para empezar a almacenar los objetos en el array */
		setGastos([...gastos, gasto]);
		/* #9.8 Cerramos el modal al ingresar un gasto */
		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	return (
		/* #11.3 en caso de que el modal exista, le agregamos la clase fijar para que el modal no tenga scroll */
		<div className={modal ? "fijar" : ""}>
			<Header
				/* #12 pasamos el como prop el gasto para empezar a calcular el valor disponible y gastado */
				gastos={gastos}
				/* #1.1 Le pasamos el prop al componente header para usar los states */
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				/* #2.1 Le pasamos el prop al componente header para usar los states */
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
			/>

			{/* #4.3 Creamos el validador para mostrar el botón solo cuando sea true el presupuesto */}
			{isValidPresupuesto && (
				/* #10 agregamos un fragment y el main para empezar a agregar los gastos en pantalla */
				<>
					<main>
						<ListadoGastos
							/* #10.2 Le pasamos los gastos para crear validaciones */
							gastos={gastos}
							/* #14.1 Pasamos el prop */
							setGastoEditar={setGastoEditar}
						/>
					</main>
					{/* #4 creamos el botón para agregar nuevos gastos */}
					<div className="nuevo-gasto">
						{/* #4.2 Agregamos la imagen */}
						<img
							src={IconoNuevoGasto}
							alt="Icono nuevo gasto"
							/* #5.1 Agregamos la función del modal con evento click */
							onClick={handleModal}
						/>
					</div>
				</>
			)}

			{/* #5.3 Hacemos la validación del modal */}
			{modal && (
				<Modal
					/* #5.8 pasamos el prop para usar los datos de setModal */
					setModal={setModal}
					/* #6.2 Pasamos el prop del state */
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					/* #9.1 Pasamos la función al modal */
					guardarGasto={guardarGasto}
					/* #14.6 pasamos la información de la edición */
					gastoEditar={gastoEditar}
				/>
			)}
		</div>
	);
}

export default App;
