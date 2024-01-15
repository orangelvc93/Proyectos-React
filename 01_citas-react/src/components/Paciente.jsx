import React from "react";

const Paciente = () => {
	return (
		<div className="bg-white m-5 px-5 py-10 shadow-md rounded-xl">
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Nombre: <span className="font-normal normal-case">Hook</span>
			</p>
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Propietario: <span className="font-normal normal-case">Orangel</span>
			</p>
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Email:{" "}
				<span className="font-normal normal-case">correo@correo.com</span>
			</p>
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Alta:{" "}
				<span className="font-normal normal-case">05 Octubre del 2024</span>
			</p>
			<p className="font-bold mb-3 text-gray-700 uppercase">
				Síntomas:{" "}
				<span className="font-normal normal-case">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
					doloremque pariatur voluptatibus est facere, libero officia nisi.
					Atque veritatis maiores dolorum quisquam, esse voluptatem nesciunt
					eligendi voluptatibus voluptate sunt minima!
				</span>
			</p>
		</div>
	);
};

export default Paciente;
