import React from "react";

const Paciente = ({ paciente, setPaciente }) => {
	const { nombre, propietario, email, fecha, sintomas } = paciente;
	return (
		<div className="bg-white m-5 px-5 py-10 shadow-md rounded-xl">
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Nombre: <span className="font-normal normal-case">{nombre}</span>
			</p>
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Propietario:{" "}
				<span className="font-normal normal-case">{propietario}</span>
			</p>
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Email: <span className="font-normal normal-case">{email}</span>
			</p>
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Alta: <span className="font-normal normal-case">{fecha}</span>
			</p>
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Síntomas: <span className="font-normal normal-case">{sintomas}</span>
			</p>

			<div className="flex justify-between mt-10">
				<button
					type="button"
					className="bg-indigo-600 hover:bg-indigo-700 py-2 px-10 text-white font-bold uppercase rounded-lg"
					onClick={() => setPaciente(paciente)}
				>
					Editar
				</button>

				<button
					type="button"
					className="bg-red-600 hover:bg-red-700 py-2 px-10 text-white font-bold uppercase rounded-lg"
				>
					Eliminar
				</button>
			</div>
		</div>
	);
};

export default Paciente;
