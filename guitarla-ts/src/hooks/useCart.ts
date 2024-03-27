import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";
import type {Guitar, CartItem } from "../types";

const useCart = () => {

    const initialCart = () : CartItem[]=>{
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    // Estados o States
    const [data] = useState(db) ;
    const [cart, setCart] = useState(initialCart);

    //Guardar en local Storage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    //Agregamos los elementos seleccionados al carrito
    function addToCard(item : Guitar) {
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
            const newItem : CartItem = {...item, quantity : 1}
            setCart([...cart, newItem]);
        }
    }

    //Eliminar elemento del carrito
    function removeFromCart(id : Guitar['id']) {
        /* console.log("Eliminando elemento", id); */
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    }

    //Incrementar cantidad
    function increaseQuantity(id : Guitar['id']) {
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
    function decreaseQuantity(id : Guitar['id']) {
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


    /* //////// CÓDIGO DEL COMPONENTE DE HEADER */
    //State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const totalPrice = useMemo(
        () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );

    return {
        data,
        cart,
        addToCard,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        totalPrice,
    }
}

export default useCart;