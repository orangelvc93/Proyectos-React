import { useState } from "react";
import { Categories } from "../data/categories";

const Form = () => {
	const [activity, setActivity] = useState({
		category: 1,
		name: "",
		calories: 0,
	});

	const handleChange = (e) => {
		setActivity({
			...activity,
			[e.target.id]: e.target.value,
		});
	};

	return (
		<form className="bg-white shadow rounded-lg p-10 space-y-5">
			<div className="grid grid-cols-1 gap-3">
				<label
					htmlFor="category"
					className="font-bold text-lime-900"
				>
					Categoría:
				</label>
				<select
					id="category"
					value={activity.category}
					onChange={handleChange}
					className="border border-slate-300 p-2 rounded-lg w-full bg-white focus:outline-lime-900 text-lime-900"
				>
					{Categories.map((category) => (
						<option
							key={category.id}
							value={category.id}
							className="text-lime-900"
						>
							{category.name}
						</option>
					))}
				</select>
			</div>
			{/* Actividad ================================= */}
			<div className="grid grid-cols-1 gap-3">
				<label
					htmlFor="name"
					className="font-bold text-lime-900"
				>
					Actividad:
				</label>
				<input
					type="text"
					id="name"
					value={activity.name}
					onChange={handleChange}
					className="border border-l-slate-300 rounded-lg p-2 focus:outline-lime-900 text-lime-900"
					placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
				/>
			</div>
			{/* Calorías ================================= */}
			<div className="grid grid-cols-1 gap-3">
				<label
					htmlFor="calories"
					className="font-bold text-lime-900"
				>
					Calorías:
				</label>
				<input
					type="number"
					id="calories"
					value={activity.calories}
					onChange={handleChange}
					className="border border-l-slate-300 rounded-lg p-2 focus:outline-lime-900 text-lime-900"
					placeholder="Ej. 300 ó 500"
				/>
			</div>
			<input
				type="submit"
				value="Guardar Ejercicio o Guardar Comida"
				className="bg-gray-800 hover:bg-slate-900 w-full p-2 font-bold uppercase text-white rounded-lg cursor-pointer"
			/>
		</form>
	);
};

export default Form;
