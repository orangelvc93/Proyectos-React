import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FromProps = {
	dispatch: Dispatch<ActivityActions>;
	state: ActivityState;
};

const initialState: Activity = {
	id: uuidv4(),
	category: 1,
	name: "",
	calories: 0,
};

const Form = ({ dispatch, state }: FromProps) => {
	const [activity, setActivity] = useState<Activity>(initialState);

	useEffect(() => {
		if (state.activeId) {
			const selectedActivity = state.activities.filter(
				(stateActivity) => stateActivity.id === state.activeId
			)[0];
			setActivity(selectedActivity);
		}
	}, [state.activeId]);

	const handleChange = (
		e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
	) => {
		const isNumberField = ["category", "calories"].includes(e.target.id);

		/* console.log(isNumberField); */

		setActivity({
			...activity,
			[e.target.id]: isNumberField ? +e.target.value : e.target.value,
		});
	};

	const isValidActivity = () => {
		const { name, calories } = activity;
		/* console.log(name.trim() !== "" && calories > 0); */
		return name.trim() !== "" && calories > 0;
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch({ type: "save-activity", payload: { newActivity: activity } });

		setActivity({
			...initialState,
			id: uuidv4(),
		});
	};

	return (
		<form
			className="bg-white shadow rounded-lg p-10 space-y-5"
			onSubmit={handleSubmit}
		>
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
					{categories.map((category) => (
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
				value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
				className="bg-gray-800 hover:bg-slate-900 w-full p-2 font-bold uppercase text-white rounded-lg cursor-pointer disabled:opacity-25"
				disabled={!isValidActivity()}
			/>
		</form>
	);
};

export default Form;
