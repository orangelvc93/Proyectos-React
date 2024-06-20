import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

function App() {
	const [state, dispatch] = useReducer(activityReducer, initialState);
	/* console.log(state); */

	useEffect(() => {
		localStorage.setItem("activities", JSON.stringify(state.activities));
	}, [state.activities]);

	const canRestartApp = () =>
		useMemo(() => state.activities.length, [state.activities]);

	return (
		<>
			<header className="bg-lime-600 py-3">
				<div className="max-w-4xl mx-auto flex justify-between">
					<h1 className="px-3 text-center text-lg font-bold text-white uppercase">
						Contador de calorías
					</h1>
					<button
						className="bg-gray-800 hover:bg-gray-900 disabled:opacity-10 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm"
						disabled={!canRestartApp()}
						onClick={() => dispatch({ type: "restart-app" })}
					>
						Reiniciar App
					</button>
				</div>
			</header>

			<section className="bg-lime-500 py-20 px-5">
				<div className="max-w-4xl mx-auto">
					<Form
						dispatch={dispatch}
						state={state}
					/>
				</div>
			</section>

			{/* Listado de Elementos */}
			<section className="p-10 mx-auto max-w-4xl">
				<ActivityList
					activities={state.activities}
					dispatch={dispatch}
				/>
			</section>
		</>
	);
}

export default App;
