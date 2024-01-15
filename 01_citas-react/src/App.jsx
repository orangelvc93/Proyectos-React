import Header from "./components/Header";
import Form from "./components/Form";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {
	return (
		<div className="container mx-auto mt-20">
			<div>
				<Header />
				<div className="mt-12 md:flex ">
					<Form />
					<ListadoPacientes />
				</div>
			</div>
		</div>
	);
}

export default App;
