import ControlPresupuesto from "./ControlPresupuesto";
import NuevoPresupuesto from "./NuevoPresupuesto";

const Header = ({
	gastos,
	presupuesto,
	setPresupuesto,
	isValidPresupuesto,
	setIsValidPresupuesto,
}) => {
	return (
		<header>
			<h1>Planificador de Gastos</h1>

			{/* #2.4 Creamos la condición para mostrar las ventanas de acuerdo al validador */}
			{isValidPresupuesto ? (
				/* #3.1 Agregamos el componente al validador */
				<ControlPresupuesto
					/* #3.2 Pasamos el hook de presupuesto con un prop para utilizar el valor */
					presupuesto={presupuesto}
					/* #12.1 terminamos de pasar el prop para usarlo en este componente */
					gastos={gastos}
				/>
			) : (
				<NuevoPresupuesto
					/* #1.2 Pasamos el prop a NuevoPresupuesto */
					presupuesto={presupuesto}
					setPresupuesto={setPresupuesto}
					/* #2.2 Pasamos el prop a NuevoPresupuesto */
					setIsValidPresupuesto={setIsValidPresupuesto}
				/>
			)}
		</header>
	);
};

export default Header;
