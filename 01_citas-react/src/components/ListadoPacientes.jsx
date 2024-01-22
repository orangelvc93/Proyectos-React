import Paciente from "./Paciente";

const ListadoPacientes = ({ pacientes, setPaciente, eliminaPaciente }) => {
	return (
		<div className="md:w-1/2 lg:w-3/5 ">
			{/* #8 Mostramos los títulos de forma condicional  */}
			{pacientes && pacientes.length ? (
				<>
					<h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
					<p className="text-xl mt-5 mb-10 text-center">
						Administra tus {""}
						<span className="text-indigo-600 font-bold ">
							Pacientes y Citas
						</span>
					</p>
					<div className="md:h-screen overflow-y-scroll">
						{/* #6.1 Recorremos el arreglo de pacientes */}
						{pacientes.map((paciente) => (
							<Paciente
								/* #7.2 le pasamos el id con un prop */
								key={paciente.id}
								/* #6.2 Pasamos los datos del objeto con un prop */
								paciente={paciente}
								/* #9.2 Pasamos el prop para el componente de Pacientes */
								setPaciente={setPaciente}
								/* #10.2 Seguimos enviando el prop hasta el componente de Paciente */
								eliminaPaciente={eliminaPaciente}
							/>
						))}
					</div>
				</>
			) : (
				<>
					<h2 className="font-black text-3xl text-center">No hay pacientes</h2>
					<p className="text-xl mt-5 mb-10 text-center">
						Comienza agregando pacientes {""}
						<span className="text-indigo-600 font-bold ">
							y aparecerán en este lugar
						</span>
					</p>
				</>
			)}
		</div>
	);
};

export default ListadoPacientes;
