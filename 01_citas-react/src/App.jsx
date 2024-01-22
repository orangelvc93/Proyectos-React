import { useState, useEffect } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
	/* #5-- CREAMOS EL HOOK PARA ALMACENAR LOS PACIENTES */
	const [pacientes, setPacientes] = useState(
		JSON.parse(localStorage.getItem("pacientes")) ?? [] // #11.1 Convertimos los datos del LS a JSON para mostrar en pantalla
	);
	/* #9 CREAMOS EL HOOK PARA ALMACENAR LOS DATOS DE CADA PACIENTE */
	const [paciente, setPaciente] = useState({});

	/* #11 Convertimos los datos en string cada vez que haya un cambio en pacientes, y almacenamos en el LS */
	useEffect(() => {
		localStorage.setItem("pacientes", JSON.stringify(pacientes));
	}, [pacientes]);

	/* #10 Eliminar un paciente  */
	const eliminaPaciente = (id) => {
		const pacientesActualizados = pacientes.filter(
			(paciente) => paciente.id !== id
		);
		setPacientes(pacientesActualizados);
	};

	return (
		<div className="container mx-auto mt-20">
			<Header />

			<div className="mt-12 md:flex">
				<Form
					/* #5.1-- Creamos el prop para llenar el hook de pacientes */
					pacientes={pacientes}
					setPacientes={setPacientes}
					/* #9.4 Creamos el prop para pasar los datos del paciente */
					paciente={paciente}
					setPaciente={setPaciente}
				/>
				<ListadoPacientes
					/* #6-- Creamos un prop para pasar la información de pacientes */
					pacientes={pacientes}
					/* #9.1 Creamos un prop para pasar los datos de cada paciente */
					setPaciente={setPaciente}
					/* #10.1 Pasamos el prop de eliminar Paciente */
					eliminaPaciente={eliminaPaciente}
				/>
			</div>
		</div>
	);
}

export default App;
