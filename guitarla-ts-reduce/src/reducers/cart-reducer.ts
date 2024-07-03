import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

/* #1: pasamos las acciones que estaban en el custom hook */
export type CartActions =
	| { type: "add-to-cart"; payload: { item: Guitar } }
	| { type: "remove-from-cart"; payload: { id: Guitar["id"] } }
	| { type: "increase-quantity"; payload: { id: Guitar["id"] } }
	| { type: "decrease-quantity"; payload: { id: Guitar["id"] } }
	| { type: "clear-cart" };

/* #2: creamos los types para los valores iniciales */
export type CartState = {
	data: Guitar[];
	cart: CartItem[];
};

/* Traemos la información del local storage */
const initialCart = (): CartItem[] => {
	const localStorageCart = localStorage.getItem("cart");
	return localStorageCart ? JSON.parse(localStorageCart) : [];
};

/* #3: Creamos el initialState */
export const initialState: CartState = {
	data: db,
	cart: initialCart(),
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

/* Definimos los reducers */
export const cartReducer = (
	state: CartState = initialState,
	action: CartActions
) => {
	switch (action.type) {
		/* Agregar elemento del carrito ========================================== */
		case "add-to-cart":
			/* console.log("desde add to cart"); */
			const itemExists = state.cart.find(
				(guitar) => guitar.id === action.payload.item.id
			);
			console.log(itemExists);

			let updatedCart: CartItem[] = [];

			if (itemExists) {
				//Item existe en el cart
				updatedCart = state.cart.map((item) => {
					if (item.id === action.payload.item.id) {
						// El elemento ya existe en el carrito
						if (item.quantity < MAX_ITEMS) {
							// Validamos que no exceda la cantidad maxima
							return { ...item, quantity: item.quantity + 1 };
						} else {
							return item; // En caso de sobrepasar la cantidad maxima, se agrega el elemento como está
						}
					} else {
						return item; // En caso de que no esté repetido, se deja como está
					}
				});
			} else {
				//No existe, se procede a agregar
				const newItem: CartItem = { ...action.payload.item, quantity: 1 };
				updatedCart = [...state.cart, newItem];
			}
			return {
				...state,
				cart: updatedCart,
			};
		/* Eliminar elemento del carrito ========================================== */
		case "remove-from-cart":
			const updatedCartDelete = state.cart.filter(
				(item) => item.id !== action.payload.id
			);
			return {
				...state,
				cart: updatedCartDelete,
			};
		/* Incrementar cantidad a un elemento ========================================== */
		case "increase-quantity":
			const updatedIncreaseCart = state.cart.map((item) => {
				if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
					return {
						...item,
						quantity: item.quantity + 1,
					};
				}
				return item;
			});
			return {
				...state,
				cart: updatedIncreaseCart,
			};

		/* Reducir cantidad a un elemento ========================================== */
		case "decrease-quantity":
			const updatedDecreaseCart = state.cart.map((item) => {
				if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
					return {
						...item,
						quantity: item.quantity - 1,
					};
				}
				return item;
			});

			return {
				...state,
				cart: updatedDecreaseCart,
			};

		/* Limpiar carrito ========================================== */
		case "clear-cart":
			return {
				...state,
				cart: [],
			};
		default:
			return state;
	}
};
