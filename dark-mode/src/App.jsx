/* import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { FaMoon, FaSun } from "react-icons/fa"; */

/* function App() {
	const [theme, setTheme] = useState("light");

	const handleChangeTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
		console.log("Nuevo estado del tema:", theme === "light" ? "dark" : "light");
	};

	return (
		<>
			<div>
				<a
					href="https://vitejs.dev"
					target="_blank"
				>
					<img
						src={viteLogo}
						className="logo"
						alt="Vite logo"
					/>
				</a>
				<a
					href="https://react.dev"
					target="_blank"
				>
					<img
						src={reactLogo}
						className="logo react"
						alt="React logo"
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<button onClick={handleChangeTheme}>
				<div class="checkbox_item citem_1">
					<label class="checkbox_wrap">
						<input
							type="checkbox"
							name="checkbox"
							class="checkbox_inp"
						/>
						<span class="checkbox_mark"></span>
						<span className="checkbox_icon-ligth">
							<FaSun />
						</span>
						<span className="checkbox_icon-nigth">
							<FaMoon />
						</span>
					</label>
				</div>
			</button>
		</>
	);
}

export default App;
 */

import React, { useState } from "react";

const App = () => {
	const [isActive, setIsActive] = useState(false);

	const handleToggle = () => {
		setIsActive(!isActive);
	};

	return (
		<div
			className={`container ${isActive ? "active" : ""}`}
			onClick={handleToggle}
		>
			lkkkk
			<div className={`body ${isActive ? "active" : ""}`}>
				{/* Contenido del cuerpo */}jj
				{console.log("prueba")}
			</div>
		</div>
	);
};

export default App;
