import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
/* #9.6 Importamos el snipet para generar Id */
import { generaId } from "./helpers";
/* #4.1 Importamos la imagen que usaremos para el botón */
import IconoNuevoGasto from "./img/nuevo-gasto.svg";

/* #19.1 Importamos el componente de filtros */
import Filtros from "./components/Filtros";

function App() {
	/* #1 Definimos nuestro State de presupuesto con un Hook */
	/* #18.1 pedimos que lea lo que hay en localStorage */
	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem("presupuesto")) ?? 0
	);

	/* #2 creamos un hook para comprobar si el valor es valido */
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

	/* #5.2 Creamos el hook del modal */
	const [modal, setModal] = useState(false);
	/* #6 Creamos un hook para darle animación del modal */
	const [animarModal, setAnimarModal] = useState(false);

	/* #9.3 Definimos el Hook para almacenar los valores */
	/* #18.4 Hacemos que guarde lo que está en el LS*/
	const [gastos, setGastos] = useState(
		localStorage.getItem("gastos")
			? JSON.parse(localStorage.getItem("gastos"))
			: []
	);

	/* #14 Creamos state para los datos Editados  */
	const [gastoEditar, setGastoEditar] = useState({});

	/* #19.3 Creamos un state para el filtro */
	const [filtro, setFiltro] = useState("");

	/* #19.7 Creamos un hook para no afectar el hook de gasto */
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	/* #14.5 creamos un useEffect para detectar cambios */
	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			setModal(true);
			/* indicamos que se ejecute luego de un tiempo */
			setTimeout(() => {
				setAnimarModal(true);
			}, 500);
		}
	}, [gastoEditar]);

	/* #18 Guardar en el localStorage */
	useEffect(() => {
		localStorage.setItem("presupuesto", presupuesto);
	}, [presupuesto]);

	/* #18.3 Agregamos los gastos al LS */
	useEffect(() => {
		localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
	}, [gastos]);

	/* #19.6 Creamos un effect que escuche por los cambios que ocurran en filtro  */
	useEffect(() => {
		if (filtro) {
			/* console.log("filtrando... ", filtro) */
			/* Filtros por categoría */
			const gastosFiltrados = gastos.filter(
				(gasto) => gasto.categoria === filtro
			);

			/* console.log(gastosFiltrados); */
			setGastosFiltrados(gastosFiltrados);
		}
	}, [filtro]);

	/* #18.2 Cuando exista elementos en el local Storage, saltamos a la pagina de la grafica */
	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;

		if (presupuestoLS > 0) {
			setIsValidPresupuesto(true);
		}
	}, []);

	/* ----------------------------- */

	/* #5 Creamos una función para el modal */
	const handleNuevoGasto = () => {
		setModal(true);
		setGastoEditar({});
		/* #6.1 indicamos que se ejecute luego de un tiempo */
		setTimeout(() => {
			setAnimarModal(true);
		}, 500);
	};

	/* #9 Creamos una función para almacenar los valores del gasto */
	const guardarGasto = (gasto) => {
		/* #15.5 Creamos una validación para comprobar si existe o no un ID  */
		if (gasto.id) {
			//Actualizar
			/* #15.6 creamos un nuevo arreglo con los gastos actualizados para que se reemplace por el elemento editado y no cree uno nuevo */
			const gastosActualizados = gastos.map((gastoState) =>
				gastoState.id === gasto.id ? gasto : gastoState
			);
			setGastos(gastosActualizados);
			/* #16.8 Tambien limpiamos aqui */
			setGastoEditar({});
		} else {
			//Nuevo gasto
			/* #9.7 agregamos el id al objeto antes de guardarlo */
			gasto.id = generaId();
			/* #10.8 guardamos la fecha en el objeto de gasto */
			gasto.fecha = Date.now();
			/* #9.4 Pasamos el hook para empezar a almacenar los objetos en el array */
			setGastos([...gastos, gasto]);
		}

		/* #9.8 Cerramos el modal al ingresar un gasto */
		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	/* #16 Eliminar Gasto */
	const eliminarGasto = (id) => {
		/* console.log("eliminando", id); */

		/* #16.5 Acomodamos la función para que traiga los gastos con diferentes id  */
		const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);

		setGastos(gastosActualizados);
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
				/* #22 Para Eliminar todo el registro */
				setGastos={setGastos}
				setGastosFiltrados={setGastosFiltrados}
				setFiltro={setFiltro}
			/>

			{/* #4.3 Creamos el validador para mostrar el botón solo cuando sea true el presupuesto */}
			{isValidPresupuesto && (
				/* #10 agregamos un fragment y el main para empezar a agregar los gastos en pantalla */
				<>
					<main>
						{/* #19.2 agregamos el componente antes de listado gastos */}
						<Filtros
							/* #19.4 pasamos los datos para traer valores */
							filtro={filtro}
							setFiltro={setFiltro}
						/>

						<ListadoGastos
							/* #10.2 Le pasamos los gastos para crear validaciones */
							gastos={gastos}
							/* #14.1 Pasamos el prop */
							setGastoEditar={setGastoEditar}
							/* #16.1 Pasamos el prop */
							eliminarGasto={eliminarGasto}
							/* #20 Para mostrar en pantalla los gastos filtrados */
							filtro={filtro}
							gastosFiltrados={gastosFiltrados}
							setGastosFiltrados={setGastosFiltrados}
						/>
					</main>
					{/* #4 creamos el botón para agregar nuevos gastos */}
					<div className="nuevo-gasto">
						{/* #4.2 Agregamos la imagen */}
						<img
							src={IconoNuevoGasto}
							alt="Icono nuevo gasto"
							/* #5.1 Agregamos la función del modal con evento click */
							onClick={handleNuevoGasto}
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
					/* #16.6 Resetear el state al finalizar un gasto editado */
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
}

export default App;
