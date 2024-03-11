/* #10.10 importamos el helper de formatear fecha */
import { formatearFecha } from "../helpers";

/* #13 instalamos e importamos la libreria de swipe list */
import {
	LeadingActions,
	SwipeableList,
	SwipeableListItem,
	SwipeAction,
	TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

/* #11 importamos todos los iconos */
import IconoAhorro from "../img/icono_ahorro.svg";
import IconoCasa from "../img/icono_casa.svg";
import IconoComida from "../img/icono_comida.svg";
import IconoGastos from "../img/icono_gastos.svg";
import IconoOcio from "../img/icono_ocio.svg";
import IconoSalud from "../img/icono_salud.svg";
import IconoSuscripciones from "../img/icono_suscripciones.svg";

/* #11.1 Creamos un objeto para el diccionario de iconos */
const diccionarioIconos = {
	ahorro: IconoAhorro,
	comida: IconoComida,
	casa: IconoCasa,
	gastos: IconoGastos,
	ocio: IconoOcio,
	salud: IconoSalud,
	suscripciones: IconoSuscripciones,
};

/* #10.5 Creamos el componente para crear el gasto */
const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
	const { categoria, nombre, cantidad, id, fecha } = gasto;

	/* #13.2 Creamos los efectos al inicio y el final del swipe */
	const leadingActions = () => (
		<LeadingActions>
			{/* #14.3 le pasamos la informacion de gastos a setGastoEditar */}
			<SwipeAction onClick={() => setGastoEditar(gasto)}>Editar..</SwipeAction>
		</LeadingActions>
	);

	const trailingActions = () => (
		/* $14.4 Configuramos el lado de eliminar */
		<TrailingActions>
			<SwipeAction
				/* #16.6 Le pasamos un prop por defecto al Swipe para mejorar el efecto de desaparecer */
				destructive={true}
				/* #16.3 Le agregamos le función al click */
				onClick={() => eliminarGasto(id)}
			>
				Eliminar
			</SwipeAction>
		</TrailingActions>
	);

	return (
		/* #13.1 Rodeamos la lista con el componente del Swipeable list */
		<SwipeableList>
			<SwipeableListItem
				leadingActions={leadingActions()}
				trailingActions={trailingActions()}
			>
				{/*  #10.7 Procedemos a completar el html */}
				<div className="gasto sombra">
					<div className="contenido-gasto">
						{/* #11.2 Agregamos la imagen dinamicamente */}
						<img
							src={diccionarioIconos[categoria]}
							alt="Icono Gasto"
						/>
						<div className="descripcion-gasto">
							<p className="categoria">{categoria}</p>
							<p className="nombre-gasto">{nombre}</p>
							{/* #10.11 Agregamos el parrafo con la fecha */}
							<p className="fecha-gasto">
								Agregado el: {""}
								<span>{formatearFecha(fecha)}</span>
							</p>
						</div>
					</div>
					{/* #10.12 Continuamos creando el gasto */}
					<p className="cantidad-gasto">${cantidad}</p>
				</div>
			</SwipeableListItem>
		</SwipeableList>
	);
};

export default Gasto;
