import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
	const [pacientes, setPacientes] = useState([]);
	const [paciente, setPaciente] = useState({});
	return (
		<div className="container mx-auto mt-20">
			<div>
				<Header />
				<div className="mt-12 md:flex ">
					<Form
						pacientes={pacientes}
						setPacientes={setPacientes}
						paciente={paciente}
					/>
					<ListadoPacientes
						pacientes={pacientes}
						setPaciente={setPaciente}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
