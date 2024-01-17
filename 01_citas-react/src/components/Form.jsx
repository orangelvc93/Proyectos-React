import { useState, useEffect } from "react";
import Error from "./Error";

const Form = ({ pacientes, setPacientes, paciente, setPaciente }) => {
	const [nombre, setNombre] = useState("");
	const [propietario, setPropietario] = useState("");
	const [email, setEmail] = useState("");
	const [fecha, setFecha] = useState("");
	const [sintomas, setSintomas] = useState("");

	const [error, setError] = useState(false);

	useEffect(() => {
		if (Object.keys(paciente).length > 0) {
			const { nombre, propietario, email, fecha, sintomas } = paciente;
			setNombre(nombre);
			setPropietario(propietario);
			setEmail(email);
			setFecha(fecha);
			setSintomas(sintomas);
		}
	}, [paciente]);

	const generaId = () => {
		const random = Math.random().toString(36).slice(2);
		const fecha = Date.now().toString(36);
		return random + fecha;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if ([nombre, propietario, email, fecha, sintomas].includes("")) {
			setError(true);
			return;
		}
		setError(false);

		const objetoPaciente = {
			nombre,
			propietario,
			email,
			fecha,
			sintomas,
		};

		if (paciente.id) {
			//Editando el registro
			objetoPaciente.id = paciente.id;
			const pacientesActualizados = pacientes.map((pacienteState) =>
				pacienteState.id === objetoPaciente.id ? objetoPaciente : pacienteState
			);

			setPacientes(pacientesActualizados);
			setPaciente({});
		} else {
			//Nuevo Registro
			objetoPaciente.id = generaId();
			setPacientes([...pacientes, objetoPaciente]);
		}

		setNombre("");
		setPropietario("");
		setEmail("");
		setFecha("");
		setSintomas("");
	};

	return (
		<div className="md:w-1/2 lg:w-2/5">
			<h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

			<p className="text-lg mt-5 text-center mb-10">
				Añade Pacientes y {""}
				<span className="text-indigo-600 font-bold">Administralos</span>
			</p>

			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
			>
				{error && (
					<Error>
						<p>Todos los campos son obligatorios</p>
					</Error>
				)}

				<div className="mb-5">
					<label
						htmlFor="mascota"
						className="block text-gray-700 font-bold uppercase"
					>
						Nombre Mascota
					</label>
					<input
						id="mascota"
						type="text"
						placeholder="Nombre de la Mascota"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600 focus:outline-none focus:ring focus:border-indigo-600"
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="propietario"
						className="block text-gray-700 font-bold uppercase"
					>
						Propietario
					</label>
					<input
						id="propietario"
						type="text"
						placeholder="Nombre del Propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600 focus:outline-none focus:ring focus:border-indigo-600 "
						value={propietario}
						onChange={(e) => setPropietario(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="email"
						className="block text-gray-700 font-bold uppercase"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="Email del Propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600 focus:outline-none focus:ring focus:border-indigo-600 "
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="alta"
						className="block text-gray-700 font-bold uppercase"
					>
						Alta
					</label>
					<input
						id="alta"
						type="date"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600 focus:outline-none focus:ring focus:border-indigo-600 "
						value={fecha}
						onChange={(e) => setFecha(e.target.value)}
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="sintomas"
						className="block text-gray-700 font-bold uppercase"
					>
						Síntomas
					</label>
					<textarea
						id="sintomas"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md hover:border-indigo-600 focus:outline-none focus:ring focus:border-indigo-600"
						placeholder="Describe los Síntomas"
						value={sintomas}
						onChange={(e) => setSintomas(e.target.value)}
					/>
				</div>

				<input
					type="submit"
					className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
					value={paciente.id ? "Editar paciente" : "Agregar Paciente"}
				/>
			</form>
		</div>
	);
};

export default Form;
