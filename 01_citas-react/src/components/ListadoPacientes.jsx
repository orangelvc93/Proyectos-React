import Paciente from "./Paciente";

const ListadoPacientes = () => {
	return (
		<div className="md:w-1/2 lg:w-3/5">
			<h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
			<p className="mt-5 text-xl mb-10 text-center">
				Administra tus{" "}
				<span className="text-indigo-600 font-bold">Pacientes y Citas</span>
			</p>
			<div className="md:h-screen overflow-y-scroll no-scrollbar ">
				<Paciente />
				<Paciente />
				<Paciente />
				<Paciente />
				<Paciente />
			</div>
		</div>
	);
};

export default ListadoPacientes;
