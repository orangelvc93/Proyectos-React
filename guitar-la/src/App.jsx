import { useEffect, useState } from "react";
import Header from "./components/Header";
import Guitarra from "./components/Guitarra";

import { db } from "./data/db";

function App() {
	// Estados o States
	const [data, setData] = useState([]);
	const [cart, setCart] = useState(
		localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
	);

	//Guardar en local Storage
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	const MAX_ITEMS = 5;
	const MIN_ITEMS = 1;

	//Agregamos todo el contenido de la base de datos
	useEffect(() => {
		setData(db);
	}, []);

	//Agregamos los elementos seleccionados al carrito
	function addToCard(item) {
		const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

		if (itemExists >= 0) {
			//Validamos primero la cantidad para no pasar el limite
			if (cart[itemExists].quantity >= MAX_ITEMS) return;

			//existe en el carrito
			const updatedCart = [...cart];
			updatedCart[itemExists].quantity++;
			setCart(updatedCart);
		} else {
			//No existe, se procede a agregar
			item.quantity = 1;
			setCart([...cart, item]);
		}
	}

	//Eliminar elemento del carrito
	function removeFromCart(id) {
		/* console.log("Eliminando elemento", id); */
		setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
	}

	//Incrementar cantidad
	function increaseQuantity(id) {
		const updatedCart = cart.map((item) => {
			if (item.id === id && item.quantity < MAX_ITEMS) {
				return {
					...item,
					quantity: item.quantity + 1,
				};
			}
			return item;
		});
		setCart(updatedCart);
	}

	//Eliminar cantidades
	function decreaseQuantity(id) {
		const updatedCart = cart.map((item) => {
			if (item.id === id && item.quantity > MIN_ITEMS) {
				return {
					...item,
					quantity: item.quantity - 1,
				};
			}
			return item;
		});
		setCart(updatedCart);
	}

	//Vaciar carrito
	function clearCart() {
		setCart([]);
	}

	return (
		<>
			<Header
				cart={cart}
				removeFromCart={removeFromCart}
				increaseQuantity={increaseQuantity}
				decreaseQuantity={decreaseQuantity}
				clearCart={clearCart}
			/>

			<main className="container-xl mt-5">
				<h2 className="text-center">Nuestra Colección</h2>

				<div className="row mt-5">
					{data.map((guitar) => (
						<Guitarra
							key={guitar.id}
							guitar={guitar}
							addToCard={addToCard}
						/>
					))}
				</div>
			</main>

			<footer className="bg-dark mt-5 py-5">
				<div className="container-xl">
					<p className="text-white text-center fs-4 mt-4 m-md-0">
						GuitarLA - Todos los derechos Reservados
					</p>
				</div>
			</footer>
		</>
	);
}

export default App;
