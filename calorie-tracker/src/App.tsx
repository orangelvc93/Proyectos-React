import { useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

function App() {
	const [state, dispatch] = useReducer(activityReducer, initialState);

	/* console.log(state); */

	return (
		<>
			<header className="bg-lime-600 py-3">
				<div className="max-w-4xl mx-auto flex justify-between">
					<h1 className="px-3 text-center text-lg font-bold text-white uppercase">
						Contador de calorías
					</h1>
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
